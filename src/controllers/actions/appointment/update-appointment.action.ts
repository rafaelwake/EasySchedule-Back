import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { appointmentModel } from "../../../models/appointment/appointment.model";
import { appointmentAction } from "./appointment-action";
/**
@description This file exports a class called "UpdateScheduler", which extends the "appointmentAction" class. It defines a method called "execute" which takes a user_id and an event object as arguments. It uses the appointment repository to update the appointment record in the database associated with the provided user_id and event data. It returns an object containing a success boolean (based on the number of changes made in the database), a message indicating whether the update was successful or not, and the result object from the appointment repository's update method.
*/
export default class UpdateScheduler extends appointmentAction {
  async execute(
    user_id: string,
    event: appointmentModel
  ): Promise<IPayloadResponseModel> {
    const result = await this.repository.update(user_id, event);

    const success = result.changes > 0;

    return {
      success: success,
      message: success
        ? "Evento atualizado com sucesso!"
        : "Não foi possível atualizar este evento.",
      data: result,
    };
  }
}
