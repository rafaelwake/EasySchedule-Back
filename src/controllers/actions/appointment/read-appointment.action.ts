import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { appointmentAction } from "./appointment-action";
/**
@description This file exports a class called "ReadSchedulerAction", which extends the "appointmentAction" class. It defines a method called "execute" which takes a user_id and an optional id as arguments. If an id is provided, it uses the appointment repository to retrieve the appointment record with the specified id and user_id from the database. It returns an object containing a success boolean (based on whether the record was found), a message (if the record was not found or the user is not associated with the record), and the result object from the appointment repository's readById method. If no id is provided, it uses the appointment repository to retrieve all appointment records associated with the provided user_id. It returns an object containing a success boolean and the result object from the appointment repository's read method.
*/
export default class ReadSchedulerAction extends appointmentAction {
  async execute(
    user_id: string,
    id = undefined
  ): Promise<IPayloadResponseModel> {
    if (id) {
      const result = await this.repository.readById(user_id, Number(id));
      const success = Object.keys(result).includes("created_by");

      return {
        success: success,
        message: success
          ? null
          : "O agentamento não existe ou você não está associado a ele.",
        data: result,
      };
    }

    const result = await this.repository.read(user_id);

    return {
      success: true,
      data: result,
    };
  }
}
