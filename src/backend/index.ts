/* istanbul ignore file */
import * as bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';
import Database from './models';
import databaseUtil from './utils/database-connect';
import cors from 'cors';
import compression from 'compression';
import swagger from './swagger';
import { Sequelize } from 'sequelize/types';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { initiatePassport } from './utils/authentication';

export const createApp = async () => {
  const db = new Database((await databaseUtil()) as Sequelize);
  const app = express();
  // Rate limit to 100 requests per minute for DDOS protection.
  if (process.env.NODE_ENV !== 'test') {
    app.use(rateLimit({ windowMs: 1000 * 60, max: 100 }));
  }
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(compression());
  if (process.env.NODE_ENV === 'test') {
    app.use(cors());
  } else {
    app.use(
      cors({
        origin: process.env.FRONTEND_URL as string,
      })
    );
  }
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(require('express-session')({ secret: process.env.JWT_SECRET as string, resave: true, saveUninitialized: true }));

  initiatePassport(db, app);

  // Serve API routes
  swagger(app);
  routes(app, db);


  return { app, db };
};
