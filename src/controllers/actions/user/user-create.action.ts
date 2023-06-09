import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { UserModel } from "../../../models/user/user.model";
import { UserAction } from "./user-action";
import { randomUUID } from "crypto";
/**
@description This file exports a class called "CreateUserAction" which extends "UserAction". The class defines an "execute" method which accepts a user object without the "id" and "createdAt" properties. The method first checks if a user with the given email already exists using the "readByEmail" method of the "UserRepository" class. If a user with the given email already exists, the method returns an error response. If not, the method generates a formatted date string, creates a new user with the given user object and the generated date string using the "create" method of the "UserRepository" class, and returns a response with a success status and data.
*/
export class CreateUserAction extends UserAction {
  async execute(
    user: Omit<UserModel, "id" | "createdAt">
  ): Promise<IPayloadResponseModel> {
    const alreadyExist = await this.repository.readByEmail(user.email);

    if (alreadyExist)
      return {
        success: false,
        message: "Tente outro e-mail, este já está sendo utilizado.",
        data: [],
      };

    let now = new Date();
    let day = now.getDate().toString().padStart(2, "0");
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let year = now.getFullYear();
    let hour = now.getHours().toString().padStart(2, "0");
    let minute = now.getMinutes().toString().padStart(2, "0");
    let formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;

    const result = await this.repository.create({
      id: randomUUID(),
      name: user.name.trim(),
      email: user.email.trim(),
      password: user.password.trim(),
      createdAt: formattedDate,
    });

    const created = Object.keys(result).includes("lastID");

    return {
      success: created,
      message: "",
      data: result,
    };
  }
}
