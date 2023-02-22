import express from 'express';
import logger from './logger';
import Database from '../models';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as DiscordStrategy } from 'passport-discord';
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');

export const initiatePassport = (db: Database, app: express.Express) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await db.Users.findOne({ where: { email } });
      if (!user) return done(null, false, { message: 'Incorrect email or password.' });
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return done(null, false, { message: 'Incorrect email or password.' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID as string,
    clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    callbackURL: '/api/discord/callback',
    scope: ['identify', 'email'],
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user: any = await db.Users.findOne({ where: { email: profile.email as string } });
      if (!user) {
        user = new db.Users({
          id: uuidv4(),
          email: profile.email,
          username: profile.username,
          discordId: profile.id,
          discordHandle: profile.username + '#' + profile.discriminator
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));
  passport.serializeUser(function (user: any, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id: string, done) {
    const user = await db.Users.findByPk(id);
    done(null, user);

  });
  app.use(passport.initialize());
  app.use(passport.session());
}


/**
 * @function void Express middleware to decode token and attach to res.locals
 * @param {express.Request} req Express request object
 * @param {express.Response} res Express response object
 * @param {express.NextFunction} next Express response object
 * @param {Database} db Database object
 */
export const authentication = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  db: Database
): Promise<void> => {
  const nonAuthenticatedRoutes = [
    '/api/login',
    '/api/signup',
    '/api/discord',
    '/api/discord/callback',
    '/api/discord/success',
  ]
  console.log(req.path)
  if (nonAuthenticatedRoutes.includes(req.path)) {
    return next();
  }
  try {
    const { authorization } = req.headers;
    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'test') {
      const token = (authorization as string).split(' ')[1];
      const decoded = jwt.decode(token, { complete: true }) as any;
      res.locals.user = decoded.payload;
    } else {
      res.locals.user = await validateToken(authorization as string);
    }
    return next();
  } catch (err) {
    logger.error(err);
    res.status(401).send('Unable to authenticate request.');
  }
};

/* istanbul ignore next */
export const validateToken = async (authHeader: string) => {
  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

