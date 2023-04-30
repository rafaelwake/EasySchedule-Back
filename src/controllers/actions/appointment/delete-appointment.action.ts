import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { appointmentAction } from "./appointment-action";

export default class DeleteSchedulerAction extends appointmentAction {
  async execute(id: number, user_id: string): Promise<IPayloadResponseModel> {
    await this.repository.delete(user_id, id);

    return {
      success: true,
      message: "Evento deletado com sucesso!",
      data: [],
    };
  }
}
