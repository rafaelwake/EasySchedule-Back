import { Request, Response } from "express";
import { HttpStatusCode } from "../enum/HttpStatusCode.enum";
import { JWTHash } from "../controllers/infra/jwt-hash";
import Logger from "../../config/logger";

export async function AuthMiddleware(req: any, res: Response, next: any) {
  if (!Object.keys(req.headers).includes("authorization")) {
    res.status(HttpStatusCode.NOT_AUTORIZED).json({
      message: "É necessário se autenticar para realizar está operação.",
    });
    return;
  }

  let bearer = req.headers["authorization"]?.split("Bearer")[1];

  bearer = bearer?.trim();

  const hashService = new JWTHash();

  try {
    const data = await hashService?.check(String(bearer));
    req["user"] = data;
    next();
  } catch (error) {
    Logger.error("JsonWebTokenError: ", error);
    res.status(HttpStatusCode.NOT_AUTORIZED).json({
      message: "Token inválido. A autenticação falhou.",
    });
  }
}
