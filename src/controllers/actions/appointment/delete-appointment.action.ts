import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { appointmentAction } from "./appointment-action";
/**
@description This file exports a class called "DeleteSchedulerAction", which extends the "appointmentAction" class. It defines a method called "execute" which takes an id and a user_id as arguments. It uses the appointment repository to delete the appointment record with the specified id and user_id from the database. Finally, it returns an object indicating a successful deletion, along with a message and empty data array.
*/
export default class DeleteSchedulerAction extends appointmentAction {
  async execute(id: number, user_id: string): Promise<IPayloadResponseModel> {
    await this.repository.delete(user_id, id);

    return {
      success: true,
      message: "Evento deletado com sucesso!",
      data: [],
    };
  }
}
