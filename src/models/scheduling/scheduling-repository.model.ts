import { SchedulingModel } from "./scheduling.model";

export interface SchedulingRepositoryModel {
  create(user_id: string, event: SchedulingModel): Promise<any>;
  read(user_id: string): Promise<any[]>;
  readById(user_id: string, id: number): Promise<any>;
  update(user_id: string, event: SchedulingModel): Promise<any>;
  delete(user_id: string, id: number): Promise<void>;
}
