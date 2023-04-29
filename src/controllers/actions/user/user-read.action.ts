import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { UserAction } from "./user-action";

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
