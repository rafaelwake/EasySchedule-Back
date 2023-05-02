import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { UserAction } from "./user-action";
/**
 * Retrieves a single user by ID from the database.
 * @param id - The ID of the user to retrieve.
 * @returns An IPayloadResponseModel containing information about the operation's success or failure, and the retrieved user data if successful.
 */

export class ReadUserAction extends UserAction {
  async execute(id: string): Promise<IPayloadResponseModel> {
    const user = await this.repository.read(id);

    if (user) delete user.password;

    const userFound = typeof user != "undefined";

    return {
      success: typeof user != "undefined",
      message: userFound ? null : "Usuário não encontrado!",
      data: user,
    };
  }
}
