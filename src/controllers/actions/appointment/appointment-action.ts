import SQLiteDB from "../../infra/persistence";
import { appointmentRepositoryModel } from "../../../models/appointment/appointment-repository.model";
import { appointmentRepository } from "../../repository/appointment-repository";

export abstract class appointmentAction {
  protected repository: appointmentRepositoryModel;

  constructor() {
    const db = SQLiteDB.getInstance();
    this.repository = new appointmentRepository(db);
  }
}
