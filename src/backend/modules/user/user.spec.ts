import { rest } from 'msw';
import { BackendTestingGlobals } from '../../../../testing/types';
import { UserModel } from '../../models/user.model';
describe('user module', () => {
  const globals = globalThis as unknown as BackendTestingGlobals;

  describe('GET /users/{id}', () => {
    it('should return an error when the user is not in the database or Azure AD.', async () => {
      globals.mswServer.use(
        rest.get(
          `https://graph.microsoft.com/v1.0/users/:userID`,
          (req, res, ctx) => {
            return res(ctx.status(404));
          }
        )
      );
      await globals.request.get(`/users/notarealuserid`).expect(404);
    });
    it('should successfully return the requesting user when "me" is passed as the id parameter', async () => {
      const response = await globals.request.get(`/users/me`).expect(200);
      expect(response.body.id).toEqual(globals.loggedInUserID);
    });
    it('should successfully return a user ', async () => {
      const response = await globals.request.get(`/users/abc`).expect(200);
      expect(response.body.id).toEqual('abc');
    });
  });

  describe('PATCH /users/{id}', () => {
    it('should return an error when the user is not in the database.', async () => {
      await globals.request
        .patch(`/users/notarealuserid`)
        .send({ surname: 'Falafel' })
        .expect(404);
    });
    it('should return an error when trying to update a user that is not the requesting user', async () => {
      await globals.request
        .patch(`/users/abc`)
        .send({ surname: 'Falafel' })
        .expect(403);
    });
    it('should successfully update and return the updated user ', async () => {
      const response = await globals.request
        .patch(`/users/${globals.loggedInUserID}`)
        .send({ surname: 'Falafel' })
        .expect(200);
      expect(response.body.surname).toEqual('Falafel');
      expect(
        ((await globals.db.User.findByPk(globals.loggedInUserID)) as UserModel)
          .surname
      ).toEqual('Falafel');
    });
  });

  describe('GET /users', () => {
    it('should return a list of users for a given search query', async () => {
      const response = await globals.request
        .get(`/users?search=Hello`)
        .expect(200);
      expect(response.body.length).toEqual(4);
    });
    it('should return a list of users filtered by a given adAppRoleName', async () => {
      globals.mswServer.use(
        rest.get(`https://graph.microsoft.com/v1.0/users`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              '@odata.context':
                'https://graph.microsoft.com/v1.0/$metadata#users(id,mail,displayName)',
              value: [
                {
                  id: 'e49ea3fb-8b2d-49f9-be81-606fb2bb2b5a',
                  mail: 'antonio.garza@chaione.com',
                  displayName: 'Antonio Garza',
                  givenName: 'Antonio',
                  surname: 'Garza',
                },
                {
                  id: '774d6f78-5477-4f71-8f6e-fea599577a50',
                  mail: 'jeg-admin@y4tk2.onmicrosoft.com',
                  displayName: 'Jordan Caudill',
                  givenName: 'Jordan',
                  surname: 'Caudill',
                },
              ],
            })
          );
        })
      );
      const response = await globals.request
        .get(`/users?search=Hello&adAppRoleName=AuthLegal`)
        .expect(200);
      expect(response.body.length).toEqual(2);
    });
  });
});
