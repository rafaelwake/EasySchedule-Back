import { UserRepositoryModel } from "../../../models/user/user-repository.model";
import SQLiteDB from "../../infra/persistence";
import { UserRepository } from "../../repository/user-repository";

export abstract class UserAction {
  protected repository: UserRepositoryModel;

  constructor() {
    const db = SQLiteDB.getInstance();
    this.repository = new UserRepository(db);
  }
}
