import { InviteRepositoryModel } from "../../../models/invite/invite-repository.model";
import { SchedulingRepositoryModel } from "../../../models/scheduling/scheduling-repository.model";
import { UserRepositoryModel } from "../../../models/user/user-repository.model";
import SQLiteDB from "../../infra/persistence";
import { InviteRepository } from "../../repository/invite-repository";
import { SchedulingRepository } from "../../repository/scheduling-repository";
import { UserRepository } from "../../repository/user-repository";

export abstract class InviteAction {
  protected repository: InviteRepositoryModel;
  protected schedulingRepository: SchedulingRepositoryModel;
  protected userRepository: UserRepositoryModel;

  constructor() {
    const db = SQLiteDB.getInstance();

    this.repository = new InviteRepository(db);
    this.schedulingRepository = new SchedulingRepository(db);
    this.userRepository = new UserRepository(db);
  }
}
