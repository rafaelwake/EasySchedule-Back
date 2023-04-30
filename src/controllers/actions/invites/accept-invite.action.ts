import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { InviteAction } from "./invite-action";
import Logger from "../../../../config/logger";

export class AcceptInviteAction extends InviteAction {
  async execute(token: string): Promise<IPayloadResponseModel> {
    const invite = await this.repository.readByToken(token);
    Logger.info("valor invite", invite);

    if (!invite)
      return {
        success: false,
        message: "Convite não encontrado!",
        data: [],
      };

    if (invite.accepted == 1) {
      return {
        success: false,
        message: "Convite já aceito anteriormente.",
        data: [],
      };
    }

    await this.repository.accept(token, 1);

    return {
      success: true,
      message: "Convite aceito com sucesso!",
      data: [],
    };
  }
}
