import { UserModel } from "../../models/user/user.model";
import { UserRepositoryModel } from "../../models/user/user-repository.model";
import { IDatabase } from "../../models/infra/database/database.interface";

export class UserRepository implements UserRepositoryModel {
  constructor(private readonly database: IDatabase) {}

  async create(user: UserModel): Promise<any> {
    const result = await this.database.execute(
      "INSERT INTO users(id, name, email, password, createdAt) VALUES (?,?,?,?,?)",
      [user.id, user.name, user.email, user.password, user.createdAt]
    );

    return result;
  }

  async read(id: string): Promise<any> {
    const result = await this.database.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    return result as UserModel;
  }

  async readByEmail(email: string): Promise<UserModel> {
    const result = await this.database.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    return result as UserModel;
  }

  async readManyById(ids: string[]): Promise<any> {
    const params = ids.map((id) => "'" + id + "'").join(",");
    const query = ids ? `WHERE id IN (${params})` : "";

    let result = await this.database.execute(
      `SELECT * FROM users ${query}`,
      []
    );

    if (typeof result != "undefined" && !Array.isArray(result))
      result = [result];

    return result || [];
  }

  async readAll() {
    let result = await this.database.execute("SELECT * FROM users");

    if (typeof result != "undefined" && !Array.isArray(result))
      result = [result];

    return result;
  }

  async update(id: string, user: Partial<UserModel>): Promise<any> {
    let parameters = [];
    let fields = [];
    let query = "UPDATE users SET ";

    if (user.name) {
      parameters.push(user.name);
      fields.push("name = ?");
    }

    if (user.email) {
      parameters.push(user.email);
      fields.push("email = ?");
    }

    if (user.password) {
      parameters.push(user.password);
      fields.push("password = ?");
    }

    if (!parameters) return undefined;

    query += fields.join(", ") + " WHERE id = ?";

    parameters.push(id);

    const result = await this.database.execute(query, parameters);

    return result;
  }
}
