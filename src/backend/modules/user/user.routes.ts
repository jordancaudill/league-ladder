import userController from './user.controller';
import { Paths } from '../../routes';

const paths: Paths = {
  '/users/{id}': {
    get: {
      handler: userController.getUser,
      tags: ['User'],
      summary: 'Get user by ID',
      description:
        "Get a user by their ID",
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
        },
      ],
      responses: {
        '200': {
          description: 'A single user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
    },
  },
};

export default paths;
