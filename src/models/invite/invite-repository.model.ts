import { InviteModel } from "./invite.model";
/**
 * @description This code defines an interface InviteRepositoryModel with several methods related to the management of invitations. These methods include creating an invitation, reading an invitation by token, reading all invitations by a user ID, accepting an invitation, unaccepting an invitation, and removing an invitation.
 *
 */
export interface InviteRepositoryModel {
  create(appointment_id: number, invite: InviteModel): Promise<any>;
  readByToken(token: string): Promise<any>;
  read(user_id: string): Promise<any>;
  accept(token: string, accept: number): Promise<any>;
  unaccept(id: number, user_id: string): Promise<any>;
  remove(id: number, created_by: string): Promise<any>;
}
