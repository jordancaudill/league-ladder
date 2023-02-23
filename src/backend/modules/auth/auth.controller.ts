import express from 'express';
import jwt from 'jsonwebtoken';
import { SignupRequestBody } from '../../../shared/types/User';
import Database from '../../models';
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');

export default {
    signup: async (
        req: express.Request,
        res: express.Response,
        db: Database
    ): Promise<express.Response> => {
        const { email, password, birthDate, username } = req.body as SignupRequestBody;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new db.Users({
            id: uuidv4(),
            email,
            password: hashedPassword,
            birthDate,
            username,
        });
        await user.save();
        return res.send(user);
    },
    login: async (
        req: express.Request,
        res: express.Response,
        db: Database
    ): Promise<express.Response> => {
        console.log(req.user)
        const token = jwt.sign({ id: (req.user as any)._id }, process.env.JWT_SECRET as string);
        return res.json({ token });
    },
    discordSuccess: async (
        req: express.Request,
        res: express.Response,
        db: Database
    ): Promise<void> => {
        console.log(req.user)
        const token = jwt.sign({ id: (req.user as any).id }, process.env.JWT_SECRET as string);
        return res.redirect(`/home?token=${token}`);
    },
}


