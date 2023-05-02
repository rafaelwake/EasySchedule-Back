import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../enum/HttpStatusCode.enum";
/**
 *
 * @description This function validates the fields of a user account creation request. If the request body is missing any of the required fields (name, email, or password), the function returns a JSON response with a 400 (Bad Request) status code and a message indicating the missing fields.
 *
 */
export function validateUserFieldsCreateAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: "Request body is missing required fields.",
    });
  }

  next();
}
/**
 *
 * @description This is a middleware function that validates whether the required fields are present in the request body for user login. If either the email or password field is missing, it will return a HTTP 400 Bad Request status with a JSON object containing a success boolean set to false and a message property.
 *
 */
export function validateUserFieldsLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.email || !req.body.password) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: "Request body is missing required fields.",
    });
  }

  next();
}
