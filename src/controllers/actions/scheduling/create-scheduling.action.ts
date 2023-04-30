import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { SchedulingModel } from "../../../models/scheduling/scheduling.model";
import { SchedulingAction } from "./scheduling-action";

export default class CreateSchedulerAction extends SchedulingAction {
  async execute(
    user_id: string,
    event: Omit<SchedulingModel, "id" | "createdAt">
  ): Promise<IPayloadResponseModel> {
    let now = new Date();
    let day = now.getDate().toString().padStart(2, "0");
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let year = now.getFullYear();
    let hour = now.getHours().toString().padStart(2, "0");
    let minute = now.getMinutes().toString().padStart(2, "0");
    let formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
    const data: SchedulingModel = {
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
