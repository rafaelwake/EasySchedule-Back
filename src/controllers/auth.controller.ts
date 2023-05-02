import { Request, Response } from "express";
import { AuthAction } from "./actions/auth/AuthAction";
import { HttpStatusCode } from "../enum/HttpStatusCode.enum";
/**
 *
 * @description This code defines an "auth" function that handles an HTTP request to authenticate a user. It uses an instance of the "AuthAction" class to execute the authentication logic and returns a response with an HTTP status code and a JSON object containing the authentication result. The response status code is based on the success or failure of the authentication.
 *
 */
export async function auth(req: Request, res: Response) {
  const action = new AuthAction();
  const result = await action.execute(req.body.email, req.body.password);

  res
    .status(result.success ? HttpStatusCode.OK : HttpStatusCode.NOT_AUTORIZED)
    .json(result);
}
