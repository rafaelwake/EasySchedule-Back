import { appointmentModel } from "../appointment/appointment.model";
import { UserModel } from "../user/user.model";
/**
 * @description This code defines an interface called InviteModel, which describes the properties and types of an invite object. The invite object has properties such as appointment_id, user_id, created_by, token, accepted, createdAt, and optional properties user and appointment.
 *
 */

export interface InviteModel {
  appointment_id: Number;
  user_id: string;
  created_by: string;
  token: string;
  accepted?: number;
  createdAt: string;

  user?: UserModel;
  appointment?: appointmentModel;
}
