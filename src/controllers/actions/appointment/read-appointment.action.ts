import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { appointmentAction } from "./appointment-action";

export default class ReadSchedulerAction extends appointmentAction {
  async execute(
    user_id: string,
    id = undefined
  ): Promise<IPayloadResponseModel> {
    if (id) {
      const result = await this.repository.readById(user_id, Number(id));
      const success = Object.keys(result).includes("created_by");

      return {
        success: success,
        message: success
          ? null
          : "O agentamento não existe ou você não está associado a ele.",
        data: result,
      };
    }

    const result = await this.repository.read(user_id);

    return {
      success: true,
      data: result,
    };
  }
}
