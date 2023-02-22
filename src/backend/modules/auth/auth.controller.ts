import express from 'express';
import jwt from 'jsonwebtoken';
import Database from '../../models';
const bcrypt = require('bcrypt');

export default {
    signup: async (
        req: express.Request,
        res: express.Response,
        db: Database
    ): Promise<express.Response> => {
        const { email, password } = req.body;
        const hashedPassword = bcrypt.hash(password, 10);
        const user = new db.Users({ email, password: hashedPassword });
        await user.save();
        return res.json({ message: 'Signup successful.' });
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


