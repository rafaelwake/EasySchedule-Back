import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { InviteAction } from "./invite-action";

export class UnsubscribeInviteAction extends InviteAction {
  async execute(id: number, user_id: string): Promise<IPayloadResponseModel> {
    await this.repository.unaccept(id, user_id);

    return {
      success: true,
      message: "Convite recusado com sucesso!",
      data: [],
    };
  }
}
