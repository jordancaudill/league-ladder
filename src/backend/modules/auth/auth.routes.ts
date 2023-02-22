import authController from './auth.controller';
import { Paths } from '../../routes';
import passport from 'passport';

const paths: Paths = {
    '/signup': {
        post: {
            handler: authController.signup,
            tags: ['Authentication'],
            summary: 'Signup',
            description: 'Signup',
            // middleware: [
            //     (req, res, next, db) => {
            //         mustOwnResource(
            //             req,
            //             res,
            //             next,
            //             db.Attachment,
            //             parseInt(req.params.id)
            //         );
            //     },
            // ],
            requestBody: {
                description:
                    'Signup for the website.',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/SomeBody',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Success',
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
    '/login': {
        post: {
            handler: authController.login,
            tags: ['Authentication'],
            summary: 'Local Login',
            description: 'Local Login',
            middleware: [
                (req, res, next, db) => passport.authenticate('local', { session: false }),
            ],
            requestBody: {
                description:
                    'Login to the website.',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/SomeBody',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Success',
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
    '/discord': {
        get: {
            handler: passport.authenticate('discord'),
            tags: ['Authentication'],
            summary: 'Initiate Discord Auth',
            description: 'Initiate Discord Auth',
            responses: {
                '200': {
                    description: 'Success'
                },
            },

        }
    },
    '/discord/callback': {
        get: {
            handler: passport.authenticate('discord', { failureRedirect: '/error', successRedirect: '/api/discord/success' }),
            tags: ['Authentication'],
            summary: 'Discord Auth Callback',
            description: 'Discord Auth Callback',
            responses: {
                '200': {
                    description: 'Success'
                },
            },

        }
    },
    '/discord/success': {
        get: {
            handler: authController.discordSuccess,
            tags: ['Authentication'],
            summary: 'Discord Auth Success',
            description: 'Discord Auth Success',
            responses: {
                '200': {
                    description: 'Success'
                },
            },

        }
    },
};

export default paths;
