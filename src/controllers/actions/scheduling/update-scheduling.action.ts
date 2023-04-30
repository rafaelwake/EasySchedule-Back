import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { SchedulingModel } from "../../../models/scheduling/scheduling.model";
import { SchedulingAction } from "./scheduling-action";

export default class UpdateScheduler extends SchedulingAction {
  async execute(
    user_id: string,
    event: SchedulingModel
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
