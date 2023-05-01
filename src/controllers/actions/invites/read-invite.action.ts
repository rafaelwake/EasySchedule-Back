import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { InviteAction } from "./invite-action";

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
