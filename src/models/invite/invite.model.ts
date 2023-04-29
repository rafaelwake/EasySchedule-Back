import { SchedulingModel } from "../scheduling/scheduling.model";
import { UserModel } from "../user/user.model";

export interface InviteModel {
  scheduling_id: Number;
  user_id: string;
  created_by: string;
  token: string;
  accepted?: number;
  createdAt: string;

  user?: UserModel;
  scheduling?: SchedulingModel;
}
