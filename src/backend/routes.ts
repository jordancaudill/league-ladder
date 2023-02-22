import express from 'express';
import Database from './models/index';
import logger from './utils/logger';
import { OpenAPIV3 } from 'openapi-types';
import userRoutes from './modules/user/user.routes';
import authRoutes from './modules/auth/auth.routes';
import { authentication } from './utils/authentication';

export interface Paths extends OpenAPIV3.PathsObject {
  [pattern: string]: CustomPathItemObject | undefined;
}

type CustomPathItemObject = {
  [method in OpenAPIV3.HttpMethods]?: CustomOperationObject;
};

const apiPrefix = '/api';
export interface CustomOperationObject extends OpenAPIV3.OperationObject {
  /** The role needed to access the endpoint. If an array is passed, at least 1 of the roles is needed. */
  role?: string | string[];
  /** The handler function to be called when this endpoint is hit. */
  handler: (
    req: express.Request,
    res: express.Response,
    db: Database
  ) => Promise<express.Response | void>;
  /** A list of express middlware functions to be called for this route before the handler. */
  middleware?: ((
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    db: Database
  ) => void | Promise<void>)[];
}

/** All the endpoints in the application combined into a single object. */
export const paths: Paths = {
  ...userRoutes,
  ...authRoutes
};

// This module receives the express app and applies the routes for the entire API.
const routes = (app: express.Application, db: Database) => {
  for (const path in paths) {
    for (const method in paths[path]) {
      createExpressEndpoint(
        db,
        app,
        path,
        method as OpenAPIV3.HttpMethods,
        (paths[path] as CustomPathItemObject)[
        method as OpenAPIV3.HttpMethods
        ] as CustomOperationObject
      );
    }
  }
};
const createExpressEndpoint = (
  db: Database,
  app: express.Application,
  path: string,
  method: OpenAPIV3.HttpMethods,
  operation: CustomOperationObject
) => {
  let activeMiddleware: any[] = [];
  activeMiddleware = (operation.middleware || []).map(
    (fn) =>
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) =>
        fn(req, res, next, db)
  );
  app[method](
    path.replace('', apiPrefix).replaceAll(/\{/g, ':').replaceAll(/\}/g, ''),
    (req: express.Request, res: express.Response, next: express.NextFunction) =>
      authentication(req, res, next, db),
    // Apply middlware added to endpoint from route file.
    [...activeMiddleware],
    async (req: express.Request, res: express.Response) => {
      /** Wrap the handler in a try/catch block to return a 400 status and log the error if there are any uncaught errors. */
      try {
        res.set('X-XSS-Protection', '1');
        res.set('mode', 'block');
        await operation.handler(req, res, db);
      } catch (err) {
        logger.error(err);
        if (!res.headersSent) {
          res.set('content-type', 'application/json; charset=utf-8');
          return res.status(400).send({
            success: false,
            error: 'An unexpected error occurred! ¯\\_(ツ)_/¯',
          });
        }
      }
    }
  );
};

export default routes;
