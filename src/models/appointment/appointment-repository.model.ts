import { appointmentModel } from "./appointment.model";
/**
 * @description The code above declares an interface named appointmentRepositoryModel with 5 methods: create, read, readById, update, and delete. These methods define the necessary operations that must be implemented by any class that intends to act as a repository for the appointmentModel.
 *
 */
export interface appointmentRepositoryModel {
  create(user_id: string, event: appointmentModel): Promise<any>;
  read(user_id: string): Promise<any[]>;
  readById(user_id: string, id: number): Promise<any>;
  update(user_id: string, event: appointmentModel): Promise<any>;
  delete(user_id: string, id: number): Promise<void>;
}
