import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { appointmentModel } from "../../../models/appointment/appointment.model";
import { appointmentAction } from "./appointment-action";

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
