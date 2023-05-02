import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { InviteAction } from "./invite-action";
/**
@description This file exports a class called "RemoveInviteAction". It extends the "InviteAction" abstract class and defines an "execute" method. The method accepts an "invite_id" and a "user_id" parameter and removes the invite associated with the provided "invite_id" if the user is authorized to remove it. It then returns a success status and a message indicating that the invite has been removed. This class is used to implement the logic for removing an invite associated with a particular user.
*/
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
