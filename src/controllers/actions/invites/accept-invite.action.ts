import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { InviteAction } from "./invite-action";
import Logger from "../../../../config/logger";
/**
@description This file exports a class called "AcceptInviteAction", which extends the "InviteAction" class. It defines a method called "execute" which takes a token as argument. It uses the invite repository to retrieve the invite associated with the provided token. If the invite is not found, it returns an object with a success boolean set to false, a message indicating that the invite was not found, and an empty data array. If the invite has already been accepted, it returns an object with a success boolean set to false, a message indicating that the invite has already been accepted, and an empty data array. Otherwise, it uses the invite repository to update the invite record with the provided token and set its accepted property to 1. It returns an object with a success boolean set to true, a message indicating that the invite was accepted successfully, and an empty data array.
*/
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
