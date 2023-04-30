import { InviteRepositoryModel } from "../../../models/invite/invite-repository.model";
import { appointmentRepositoryModel } from "../../../models/appointment/appointment-repository.model";
import { UserRepositoryModel } from "../../../models/user/user-repository.model";
import SQLiteDB from "../../infra/persistence";
import { InviteRepository } from "../../repository/invite-repository";
import { appointmentRepository } from "../../repository/appointment-repository";
import { UserRepository } from "../../repository/user-repository";

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
