import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { appointmentModel } from "../../../models/appointment/appointment.model";
import { appointmentAction } from "./appointment-action";

export default class UpdateScheduler extends appointmentAction {
  async execute(
    user_id: string,
    event: appointmentModel
  ): Promise<IPayloadResponseModel> {
    const result = await this.repository.update(user_id, event);

    const success = result.changes > 0;

    return {
      success: success,
      message: success
        ? "Evento atualizado com sucesso!"
        : "Não foi possível atualizar este evento.",
      data: result,
    };
  }
}
