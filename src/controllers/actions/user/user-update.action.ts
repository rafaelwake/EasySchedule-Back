import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { UserModel } from "../../../models/user/user.model";
import { UserAction } from "./user-action";

export class UpdateUserAction extends UserAction {
  async execute(
    id: string,
    data: Omit<UserModel, "id" | "createdAt"> & { current_password?: string }
  ): Promise<IPayloadResponseModel> {
    const user = await this.repository.read(id);
    const userFound = typeof user != "undefined";

    if (!userFound)
      return {
        success: typeof user != "undefined",
        message: userFound ? null : "Usuário não encontrado!",
        data: user,
      };

    if (data.password && data.current_password != user.password) {
      return {
        success: false,
        message: "Informe uma senha válida para atualizar.",
        data: {},
      };
    }

    const userMail = await this.repository.readByEmail(data.email);

    if (userMail && userMail.id != id)
      return {
        success: false,
        message:
          "Tente outro e-mail, este já está sendo utilizado por outro usuário.",
        data: {},
      };

    const updated = await this.repository.update(id, data);

    return {
      success: true,
      message: "Usuário atualizado com sucesso!",
      data: updated,
    };
  }
}
