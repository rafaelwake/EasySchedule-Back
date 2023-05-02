import { IPayloadResponseModel } from "../../../models/infra/response/payload-response.model";
import { UserModel } from "../../../models/user/user.model";
import { Sha256 } from "../../../models/infra/hash/sha-250";
import EmailService from "../../infra/email-service";
import { InviteAction } from "./invite-action";
/**
@description This file exports a class called "CreateInviteAction", which extends the "InviteAction" class. It defines a method called "execute" which takes a user_id, an appointment_id, and an array of user ids as arguments. It uses the appointment repository to retrieve the appointment associated with the provided user_id and appointment_id. If the appointment is not found, it returns an object with a success boolean set to false, a message indicating that the appointment was not found, and an empty data array. It uses the user repository to retrieve the users associated with the provided user ids and filters out the user associated with the provided user_id. If there are no valid users to send invitations to, it returns an object with a success boolean set to false, a message indicating that no valid users were found, and an empty data array. For each valid user, it generates a token using the Sha256 service, creates an invite record in the invite repository associated with the provided appointment_id and the generated token, and sends an email invitation using the EmailService. It returns an object with a success boolean set to true, a message indicating that the invitations were sent successfully, and an empty data array.
*/
export class CreateInviteAction extends InviteAction {
  async execute(
    user_id: string,
    appointment_id: number,
    users: string[]
  ): Promise<IPayloadResponseModel> {
    const scheduler = await this.appointmentRepository.readById(
      user_id,
      Number(appointment_id)
    );

    console.log(scheduler);

    if (!Object.keys(scheduler).length)
      return {
        success: false,
        message: "Agendamento não encontrado!",
        data: [],
      };

    const validUsers = await this.userRepository.readManyById(users);

    const sendToUsers = validUsers.filter(
      (validUser: any) => validUser.id != user_id
    );

    if (!sendToUsers.length)
      return {
        success: false,
        message: "Informe usuários válidos para convidar!",
        data: [],
      };

    const emailService = new EmailService();
    const sha256 = new Sha256();

    sendToUsers.forEach(async (user: UserModel) => {
      const token = await sha256.encode(user_id + String(Math.random()));

      await this.repository.create(appointment_id, {
        token: token,
        created_by: user_id,
        user_id: user.id,
        appointment_id: appointment_id,
        createdAt: String(new Date().toDateString()),
      });

      await emailService.send(user.email, {
        name: user.name,
        event_name: scheduler.title,
        token: token,
      });
    });

    return {
      success: true,
      message: "Usuários convidados com sucesso!",
      data: [],
    };
  }
}
