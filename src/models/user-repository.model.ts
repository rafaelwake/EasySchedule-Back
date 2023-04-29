import { UserModel } from "./user.model";

export interface UserRepository {
  create(user: UserModel): Promise<any>;
  read(id: string): Promise<any>;
  readByEmail(email: string): Promise<UserModel>;
  readManyById(ids: string[]): Promise<any>;
  readAll(): Promise<any>;
  update(id: string, user: Partial<UserModel>): Promise<any>;
}
