import { appointmentModel } from "../appointment/appointment.model";
import { UserModel } from "../user/user.model";

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
