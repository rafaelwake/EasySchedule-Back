import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../enum/HttpStatusCode.enum";

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
