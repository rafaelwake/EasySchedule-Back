import { UserModel } from "./user.model";
/**
 * @description The above code defines the interface UserRepositoryModel which specifies the methods that must be implemented by a user repository. The interface includes methods for creating, reading, updating and deleting user data, with different options for filtering and returning results. The UserModel interface is used to define the structure of the user data.
 *
 */
export interface UserRepositoryModel {
  create(user: UserModel): Promise<any>;
  read(id: string): Promise<any>;
  readByEmail(email: string): Promise<UserModel>;
  readManyById(ids: string[]): Promise<any>;
  readAll(): Promise<any>;
  update(id: string, user: Partial<UserModel>): Promise<any>;
}
