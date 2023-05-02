import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { UserRepositoryModel } from "../../../models/user/user-repository.model";
import SQLiteDB from "../../infra/persistence";
import { JWTHash } from "../../infra/jwt-hash";
import { UserRepository } from "../../repository/user-repository";
/**
@description This file exports a class called "AuthAction". It defines a constructor that creates an instance of the SQLite database and uses that instance to create an instance of the user repository. It also defines a method called "execute" which takes an email and a password as arguments. It checks if the email is provided and retrieves the user associated with the email from the user repository. It then checks if the provided password matches the user's password. If the user or password is invalid, it returns an object with a success boolean set to false, a message indicating that the credentials are invalid, and an empty data object. If the user and password are valid, it generates a JWT token using the JWTHash service and returns an object with a success boolean set to true, a message indicating a successful login, and a data object containing the generated token and the user object with the user's id, name, email, and createdAt properties.
*/
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
    if (!email) {
      throw new Error("Email is not provided");
    }
    const user = await this.repository.readByEmail(email.trim());

    let output = {
      success: false,
      message: "Usuário/Senha inválidos!",
      data: {},
    };

    if (!user) return output;

    if (password != user.password) return output;

    output.success = true;
    output.message = "Login realizado com sucesso!"; // Mensagem alterada para sucesso

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
