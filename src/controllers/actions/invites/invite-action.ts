import { InviteRepositoryModel } from "../../../models/invite/invite-repository.model";
import { appointmentRepositoryModel } from "../../../models/appointment/appointment-repository.model";
import { UserRepositoryModel } from "../../../models/user/user-repository.model";
import SQLiteDB from "../../infra/persistence";
import { InviteRepository } from "../../repository/invite-repository";
import { appointmentRepository } from "../../repository/appointment-repository";
import { UserRepository } from "../../repository/user-repository";
/**
@description This file exports an abstract class called "InviteAction". It defines three properties: "repository", "appointmentRepository", and "userRepository", which are all defined as instances of their respective repositories. It defines a constructor that retrieves a single instance of the SQLiteDB class and sets the properties with the respective repositories. This class is meant to be extended by other classes that provide specific implementations of invite-related actions.
*/
export abstract class InviteAction {
  protected repository: InviteRepositoryModel;
  protected appointmentRepository: appointmentRepositoryModel;
  protected userRepository: UserRepositoryModel;

  constructor() {
    const db = SQLiteDB.getInstance();

    this.repository = new InviteRepository(db);
    this.appointmentRepository = new appointmentRepository(db);
    this.userRepository = new UserRepository(db);
  }
}
