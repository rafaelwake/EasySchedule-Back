import { UserRepositoryModel } from "../../../models/user/user-repository.model";
import SQLiteDB from "../../infra/persistence";
import { UserRepository } from "../../repository/user-repository";
/**
@description This file exports an abstract class called "UserAction". It defines a protected property called "repository" which is an instance of the "UserRepositoryModel" interface. The class has a constructor which creates an instance of the "UserRepository" class using the "getInstance" method of the "SQLiteDB" class and assigns it to the "repository" property. This class is used as a base class for implementing actions related to user operations in the system.
*/
export abstract class UserAction {
  protected repository: UserRepositoryModel;

  constructor() {
    const db = SQLiteDB.getInstance();
    this.repository = new UserRepository(db);
  }
}
