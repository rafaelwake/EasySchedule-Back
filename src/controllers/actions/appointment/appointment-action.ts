import SQLiteDB from "../../infra/persistence";
import { appointmentRepositoryModel } from "../../../models/appointment/appointment-repository.model";
import { appointmentRepository } from "../../repository/appointment-repository";
/**
@description This file defines an abstract class named "appointmentAction" that serves as a base for other classes needing to manipulate scheduling data. The class has a constructor that creates an instance of the SQLite database and uses that instance to create an instance of the appointment repository. The class is abstract, which means it cannot be instantiated directly, but other classes can extend it to inherit its methods and properties.
*/
export abstract class appointmentAction {
  protected repository: appointmentRepositoryModel;

  constructor() {
    const db = SQLiteDB.getInstance();
    this.repository = new appointmentRepository(db);
  }
}
