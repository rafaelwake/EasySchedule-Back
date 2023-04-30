import { InviteModel } from "./invite.model";

export interface InviteRepositoryModel {
  create(appointment_id: number, invite: InviteModel): Promise<any>;
  readByToken(token: string): Promise<any>;
  read(user_id: string): Promise<any>;
  accept(token: string, accept: number): Promise<any>;
  unaccept(id: number, user_id: string): Promise<any>;
  remove(id: number, created_by: string): Promise<any>;
}
