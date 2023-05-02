import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { UserAction } from "./user-action";
/**
Reads all users from the database and removes their password field.
@returns {Promise<IPayloadResponseModel>} The response containing the success status, optional message, and data.
*/
export class ReadAllUserAction extends UserAction {
  async execute(): Promise<IPayloadResponseModel> {
    let users = await this.repository.readAll();

    users = users.map((user: any) => {
      delete user.password;

      return user;
    });

    return {
      success: true,
      message: null,
      data: users,
    };
  }
}
