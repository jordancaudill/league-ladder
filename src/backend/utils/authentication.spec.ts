import * as authentication from './authentication';
import { BackendTestingGlobals } from '../../../testing/types';
import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { rest } from 'msw';
const globals = globalThis as unknown as BackendTestingGlobals;

describe('authentication middleware', () => {
  it('should skip authentication if the user is viewing the api documentation', async () => {
    await globals.request.get(`/docs`).expect(301);
  });
  it('should skip token validation when process.env.NODE_ENV is test', async () => {
    const validateToken = jest.spyOn(authentication, 'validateToken');
    await globals.request.get(`/users/me`).expect(200);
    expect(validateToken).not.toHaveBeenCalled();
  });
  it('should return a 401 error if the user cannot be authenticated', async () => {
    jest.spyOn(jwt, 'decode').mockImplementationOnce(() => {
      throw Error('Purposefully throwing error for test here!');
    });
    await globals.request
      .get(`/users/me`)
      .set('Authorization', 'notavalidtoken')
      .expect(401);
  });
  describe('for the /users/me path', () => {
    it('should create a user when the user does not exist in the database', async () => {
      globals.mswServer.use(
        rest.get(
          `https://graph.microsoft.com/v1.0/users/:userID`,
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json({
                mail: 'hello@aol.com',
                displayName: 'Jim Bobberton',
                id: 'cac65742-02d8-4900-bed2-593c1b234dd9123',
              })
            );
          }
        )
      );
      jest.spyOn(jwt, 'decode').mockImplementationOnce(() => ({
        payload: {
          aud: '45cb3555-ad7c-40ad-ad48-314428dd2b28',
          iss: 'https://login.microsoftonline.com/3dc7a8d3-2dba-4448-add2-fbd93f08fa4f/v2.0',
          iat: 1661790013,
          nbf: 1661790013,
          exp: Date.now() + 999999999,
          email: 'pmalone@y4tk2.onmicrosoft.com',
          /* eslint-disable camelcase */
          family_name: 'Malone',
          /* eslint-disable camelcase */
          given_name: 'Post',
          name: 'Post Malone',
          oid: 'cac65742-02d8-4900-bed2-593c1b234dd9123',
          /* eslint-disable camelcase */
          preferred_username: 'pmalone@y4tk2.onmicrosoft.com',
          rh: '0.AX0A06jHPbotSESt0vvZPwj6T1U1y0V8ra1ArUgxRCjdKyicAN8.',
          sub: 'TZhjr7MVNAdxrxQuDFTgZRR3G-hKHkA9Xqcgnh8ObxM',
          tid: '3dc7a8d3-2dba-4448-add2-fbd93f08fa4f',
          uti: 'FcRTrjj-x0ScYbfCHQ4vAA',
          ver: '2.0',
        },
        header: {
          kid: '2ZQpJ3UpbjAYXYGaXEJl8lV0TOI',
        },
      }));
      // This is for pmalone@y4tk2.onmicrosoft.com, which is a user that does not exist in mock-db.ts
      const unexistingUserToken =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiI0NWNiMzU1NS1hZDdjLTQwYWQtYWQ0OC0zMTQ0MjhkZDJiMjgiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vM2RjN2E4ZDMtMmRiYS00NDQ4LWFkZDItZmJkOTNmMDhmYTRmL3YyLjAiLCJpYXQiOjE2NjE3OTAwMTMsIm5iZiI6MTY2MTc5MDAxMywiZXhwIjoxNjYxNzkzOTEzLCJlbWFpbCI6InBtYWxvbmVAeTR0azIub25taWNyb3NvZnQuY29tIiwiZmFtaWx5X25hbWUiOiJNYWxvbmUiLCJnaXZlbl9uYW1lIjoiUG9zdCIsIm5hbWUiOiJQb3N0IE1hbG9uZSIsIm9pZCI6ImNhYzY1NzQyLTAyZDgtNDkwMC1iZWQyLTU5M2MxYjIzNGRkOSIsInByZWZlcnJlZF91c2VybmFtZSI6InBtYWxvbmVAeTR0azIub25taWNyb3NvZnQuY29tIiwicmgiOiIwLkFYMEEwNmpIUGJvdFNFU3QwdnZaUHdqNlQxVTF5MFY4cmExQXJVZ3hSQ2pkS3lpY0FOOC4iLCJzdWIiOiJUWmhqcjdNVk5BZHhyeFF1REZUZ1pSUjNHLWhLSGtBOVhxY2duaDhPYnhNIiwidGlkIjoiM2RjN2E4ZDMtMmRiYS00NDQ4LWFkZDItZmJkOTNmMDhmYTRmIiwidXRpIjoiRmNSVHJqai14MFNjWWJmQ0hRNHZBQSIsInZlciI6IjIuMCJ9.FafGh6ZZmmdGgypU8AaLGEhaLFSZmF7yzECbqMq3IboqN57ef8FjU9hXORHNTAn74WnzcZr07D9ycROGgTW0W8yrZ0AQRY1Uejbf-2Gu6C_iTQP5iWuDoQp8C3gfNpqbiZb9v-UO-IrEdSIZ-SIttRaGhBFlw6Nhf9WJ6qLw2BHRFyeB-HQ1hI3pvNRHhbj3K-B9GFM9-7onqeHSgB6GjCoRI1M4lOaR-SDTScac8fVZoRNPF15yCjWeKGv3hwCjz0zMlsSluIjZ5QDuHv3sNLDSlKrD7hvLti2sB-_OFQO_8sLcuBSlDPKcZ8thviGqNUmX1RPLQBKILBJgb8Xb4g';
      const unexistingUserID = 'cac65742-02d8-4900-bed2-593c1b234dd9123';
      await globals.request
        .get(`/users/me`)
        .set('Authorization', `Bearer ${unexistingUserToken}`)
        .expect(200);
      const user = (await globals.db.User.findByPk(
        unexistingUserID
      )) as UserModel;
      // We know the model has just been created if the createdAt and updatedAt times are equal.
      expect(user.createdAt).toEqual(user.updatedAt);
    });
  });
});
