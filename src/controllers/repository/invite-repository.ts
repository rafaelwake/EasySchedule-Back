import { InviteModel } from "../../models/invite/invite.model";
import { InviteRepositoryModel } from "../../models/invite/invite-repository.model";
import { IDatabase } from "../../models/infra/database/database.interface";
/**
 * @description The code defines a class called "InviteRepository" that implements the "InviteRepositoryModel" interface. This class provides methods to create, read, update and delete invite records in the database. It receives an instance of the "IDatabase" interface as a constructor parameter, which is used to interact with the database. The methods in the class perform SQL queries to the database and return the results. The create method creates a new invite record in the database, the read method returns a list of invite records based on user_id, the accept method updates the "accepted" field of an invite record based on the token, and the remove method deletes an invite record based on the created_by and id fields.
 */
export class InviteRepository implements InviteRepositoryModel {
  constructor(private readonly database: IDatabase) {}

  async create(appointment_id: number, invite: InviteModel): Promise<any> {
    await this.database.execute(
      "DELETE FROM invites WHERE user_id = ? AND appointment_id = ?",
      [invite.user_id, invite.appointment_id]
    );

    const result = await this.database.execute(
      `INSERT INTO invites (appointment_id, user_id, created_by, token) 
                                                     VALUES (?, ?, ?, ?)`,
      [appointment_id, invite.user_id, invite.created_by, invite.token]
    );

    return result;
  }

  async readByToken(token: string): Promise<any> {
    const result = await this.database.execute(
      "SELECT * FROM invites WHERE token = ?",
      [token]
    );
    return result;
  }

  async read(user_id: string): Promise<any> {
    let result = await this.database.execute(
      "SELECT * FROM invites WHERE created_by = ? OR user_id = ?",
      [user_id]
    );

    if (typeof result != "undefined" && !Array.isArray(result))
      result = [result];

    return result || [];
  }

  async accept(token: string, accept: number): Promise<any> {
    console.log("valor de check", accept, token);
    const result = await this.database.execute(
      "UPDATE invites SET accepted = ? WHERE token = ?",
      [accept, token]
    );

    return result;
  }

  async unaccept(id: number, user_id: string): Promise<any> {
    const result = await this.database.execute(
      "UPDATE invites SET accepted = 0 WHERE appointment_id = ? AND user_id = ?",
      [id, user_id]
    );

    return result;
  }

  async remove(id: number, created_by: string): Promise<any> {
    const result = await this.database.execute(
      "DELETE FROM invites WHERE created_by = ? AND id = ?",
      [created_by, id]
    );

    return result;
  }
}
