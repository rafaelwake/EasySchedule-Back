import { appointmentModel } from "./appointment.model";

export interface appointmentRepositoryModel {
  create(user_id: string, event: appointmentModel): Promise<any>;
  read(user_id: string): Promise<any[]>;
  readById(user_id: string, id: number): Promise<any>;
  update(user_id: string, event: appointmentModel): Promise<any>;
  delete(user_id: string, id: number): Promise<void>;
}
