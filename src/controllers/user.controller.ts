import { Request, Response } from "express";
import { CreateUserAction } from "./actions/user/user-create.action";
import { UserModel } from "../models/user/user.model";
import { HttpStatusCode } from "../enum/HttpStatusCode.enum";
import { ReadUserAction } from "./actions/user/user-read.action";
import { UpdateUserAction } from "./actions/user/user-update.action";
import { ReadAllUserAction } from "./actions/user/user-read-all-action";
import Logger from "../../config/logger";

export async function create(req: Request, res: Response) {
  console.log("Request body:", req.body); // Adicione esta linha

  if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: "Request body is missing required fields.",
    });
  }
  Logger.error(req.body);
  console.log(req.body);
  const action = new CreateUserAction();

  const user: Omit<UserModel, "id" | "createdAt"> = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const result = await action.execute(user);

  res
    .status(result.success ? HttpStatusCode.CREATED : HttpStatusCode.CONFLICT)
    .json(result);
}

export async function read(req: Request, res: Response) {
  const id = req.params.id;

  const action = new ReadUserAction();

  const result = await action.execute(id);

  res
    .status(result.success ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND)
    .json(result);
}

export async function readAll(req: any, res: Response) {
  const action = new ReadAllUserAction();

  const result = await action.execute();

  res
    .status(result.success ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND)
    .json(result);
}

export async function update(
  req: any & { user: Partial<UserModel> },
  res: Response
) {
  const id = req.user.id;

  const user: Omit<UserModel, "id" | "createdAt"> & {
    current_password?: string;
  } = {
    name: req.body.name,
    email: req.body.email,
    password: req.body?.password,
    current_password: req.body?.current_password,
  };

  const action = new UpdateUserAction();

  const result = await action.execute(id, user);

  res
    .status(result.success ? HttpStatusCode.OK : HttpStatusCode.CONFLICT)
    .json(result);
}

export function remove(req: Request, res: Response) {
  res.status(200).json({
    status: 200,
  });
}
