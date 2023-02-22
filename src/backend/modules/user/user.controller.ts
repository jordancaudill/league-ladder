import express from 'express';
import Database from '../../models';

const userController = {
  getUser: async (
    req: express.Request,
    res: express.Response,
    db: Database
  ): Promise<express.Response> => {
    return res.json({});
  },
};

export default userController;
