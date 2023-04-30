import SQLiteDB from "../../infra/persistence";
import { SchedulingRepositoryModel } from "../../../models/scheduling/scheduling-repository.model";
import { SchedulingRepository } from "../../repository/scheduling-repository";

export abstract class SchedulingAction {
  protected repository: SchedulingRepositoryModel;

  constructor() {
    const db = SQLiteDB.getInstance();
    this.repository = new SchedulingRepository(db);
  }
}
