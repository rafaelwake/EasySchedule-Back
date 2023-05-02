import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { appointmentModel } from "../../../models/appointment/appointment.model";
import { appointmentAction } from "./appointment-action";
/**
@description This file exports a class called "CreateSchedulerAction", which extends the "appointmentAction" class. It defines a method called "execute" which takes a user_id and an event object as arguments. It creates a formatted date string using the current date and time, and adds it to the event object as the createdAt property. It then uses the appointment repository to create a new appointment record in the database, using the provided user_id and event data. Finally, it returns an object containing a success boolean (based on the number of changes made in the database), and the result object from the appointment repository's create method.
*/

export default class CreateSchedulerAction extends appointmentAction {
  async execute(
    user_id: string,
    event: Omit<appointmentModel, "id" | "createdAt">
  ): Promise<IPayloadResponseModel> {
    let now = new Date();
    let day = now.getDate().toString().padStart(2, "0");
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let year = now.getFullYear();
    let hour = now.getHours().toString().padStart(2, "0");
    let minute = now.getMinutes().toString().padStart(2, "0");
    let formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
    const data: appointmentModel = {
      ...event,
      createdAt: formattedDate,
    };

    const result = await this.repository.create(user_id, data);

    return {
      success: result.changes > 0,
      data: result,
    };
  }
}
