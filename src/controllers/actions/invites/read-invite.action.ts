import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { InviteAction } from "./invite-action";
/**
@description This file exports a class called "ReadInviteAction". It extends the "InviteAction" abstract class and defines an "execute" method. The method accepts a "user_id" parameter and retrieves all invite data associated with that user by calling the "read" method of the "repository" property. It then maps over the results and deletes the "token" property from any invites created by the user before returning the results with a success status and data. This class is used to implement the logic for reading invites associated with a particular user.
*/
export default class ReadInviteAction extends InviteAction {
  async execute(user_id: string): Promise<IPayloadResponseModel> {
    let invites = await this.repository.read(user_id);

    let results = invites.map((invite: any) => {
      if (user_id == invite.created_by) delete invite.token;

      invite.created_by_me = user_id == invite.created_by;

      return invite;
    });

    return {
      success: true,
      message: null,
      data: results,
    };
  }
}
