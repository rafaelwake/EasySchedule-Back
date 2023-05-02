import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { InviteAction } from "./invite-action";
/**
@description This file exports a class called "UnsubscribeInviteAction". It extends the "InviteAction" abstract class and defines an "execute" method. The method accepts an "id" and a "user_id" parameter and removes the user's acceptance of an invite associated with the provided "id" if the user has already accepted it. It then returns a success status and a message indicating that the invite has been unsubscribed. This class is used to implement the logic for unsubscribing from an invite associated with a particular user.
*/
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
