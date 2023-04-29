import { Request, Response } from "express";
import { AuthAction } from "./actions/auth/AuthAction";
import { HttpStatusCode } from "../enum/HttpStatusCode.enum";

export async function test(req: Request, res: Response) {
  console.log(req.body);
  const result = "API Working";
  res.status(result ? HttpStatusCode.OK : HttpStatusCode.OK).json(result);
}
