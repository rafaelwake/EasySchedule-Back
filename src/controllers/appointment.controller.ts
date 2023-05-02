import { Request, Response } from "express";
import { UserModel } from "../models/user/user.model";
import { appointmentModel } from "../models/appointment/appointment.model";
import { HttpStatusCode } from "../enum/HttpStatusCode.enum";
import UpdateSchedulerAction from "../controllers/actions/appointment/update-appointment.action";
import CreateSchedulerAction from "../controllers/actions/appointment/create-appointment.action";
import ReadSchedulerAction from "../controllers/actions/appointment/read-appointment.action";
import DeleteSchedulerAction from "../controllers/actions/appointment/delete-appointment.action";
/**
 * @description The code defines four functions create, read, update, and remove, which handle HTTP requests for creating, reading, updating, and deleting appointments in a scheduling application. These functions receive the request and response objects and call specific actions from the controllers to handle the business logic of the application. The create function receives appointment data from the request, creates an appointment with the CreateSchedulerAction, and returns the appointment data in the response. The read function receives an optional appointment id from the request, reads the appointment data with the ReadSchedulerAction, and returns the appointment data or an error in the response. The update function receives updated appointment data from the request, updates the appointment with the UpdateSchedulerAction, and returns the updated appointment data or an error in the response. The remove function receives an appointment id from the request, deletes the appointment with the DeleteSchedulerAction, and returns a success message in the response.
 *
 *
 *
 */
export const create = async (
  req: any & { user: Partial<UserModel> },
  res: Response
) => {
  const user_id = req.user.id;

  const event: Omit<appointmentModel, "id" | "createdAt"> = {
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
  let event: appointmentModel = {
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
