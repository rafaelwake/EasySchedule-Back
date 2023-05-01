import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { InviteAction } from "./invite-action";

export default class RemoveInviteAction extends InviteAction {
  async execute(
    invite_id: number,
    user_id: string
  ): Promise<IPayloadResponseModel> {
    await this.repository.remove(invite_id, user_id);

    return {
      success: true,
      message: "Convite removido com sucesso!",
      data: [],
    };
  }
}
