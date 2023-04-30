import { Request, Response } from "express";
import { UserModel } from "../models/user/user.model";
import { SchedulingModel } from "../models/scheduling/scheduling.model";
import { HttpStatusCode } from "../enum/HttpStatusCode.enum";
import UpdateSchedulerAction from "../controllers/actions/scheduling/update-scheduling.action";
import CreateSchedulerAction from "../controllers/actions/scheduling/create-scheduling.action";
import ReadSchedulerAction from "../controllers/actions/scheduling/read-scheduling.action";
import DeleteSchedulerAction from "../controllers/actions/scheduling/delete-scheduling.action";

export const create = async (
  req: any & { user: Partial<UserModel> },
  res: Response
) => {
  const user_id = req.user.id;

  const event: Omit<SchedulingModel, "id" | "createdAt"> = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    duration: req.body.duration,
    location: req.body.location,
  };

  const action = new CreateSchedulerAction();

  const result = await action.execute(user_id, event);

  res.status(HttpStatusCode.CREATED).json(result);
};

export const read = async (
  req: any & { user: Partial<UserModel> },
  res: Response
) => {
  const id = req.params.id || undefined;
  const user_id = req.user.id;

  const action = new ReadSchedulerAction();

  const result = await action.execute(user_id, id);

  res
    .status(result.success ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND)
    .json(result);
};
export const update = async (
  req: any & { user: Partial<UserModel> },
  res: Response
) => {
  let user_id = req.user.id;
  let event: SchedulingModel = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    duration: req.body.duration,
    date: req.body.date,
  };
  const action = new UpdateSchedulerAction();

  const result = await action.execute(user_id, event);

  res
    .status(result.success ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND)
    .json(result);
};

export const remove = async (
  req: any & { user: Partial<UserModel> },
  res: Response
) => {
  const id = req.params.id || undefined;
  const user_id = req.user.id;

  const action = new DeleteSchedulerAction();

  const result = await action.execute(id, user_id);

  res.status(HttpStatusCode.OK).json(result);
};
