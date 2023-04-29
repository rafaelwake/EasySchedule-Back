import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { UserRepositoryModel } from "../../../models/user/user-repository.model";
import SQLiteDB from "../../infra/persistence";
import { JWTHash } from "../../infra/jwt-hash";
import { UserRepository } from "../../repository/user-repository";

export class AuthAction {
  protected repository: UserRepositoryModel;

  constructor() {
    const db = SQLiteDB.getInstance();
    this.repository = new UserRepository(db);
  }

  async execute(
    email: string,
    password: string
  ): Promise<IPayloadResponseModel> {
    const user = await this.repository.readByEmail(email.trim());

    let output = {
      success: false,
      message: "Usuário/Senha inválidos!",
      data: {},
    };

    if (!user) return output;

    if (password != user.password) return output;

    output.success = true;

    const hashService = new JWTHash();
    const token = await hashService.encode({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    output.data = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    };

    return output;
  }
}
