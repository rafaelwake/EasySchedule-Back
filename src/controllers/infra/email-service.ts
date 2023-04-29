import SMTPTransport from "nodemailer/lib/smtp-transport";
import { IEmail } from "../../models/infra/mail/email.interface";
import dotenv from "dotenv";
dotenv.config();

import * as nodemailer from "nodemailer";

export default class EmailService implements IEmail {
  async send(
    email: string,
    options: { name: string; event_name: string; token: string }
  ): Promise<any> {
    const html = this.template(
      options.name,
      options.event_name,
      process.env.BASE_URL + "invite?token=" + options.token
    );

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      logger: true,
    });

    const sended = await transporter.sendMail({
      from: "Invite ",
      to: email,
      subject: "Convite de evento",
      html: html,
    });
  }

  private template(name: string, event_name: string, link: string) {
    const t = `
      <h1>Olá ${name}</h1>
      <b>Estou te convidadando para o evento ${event_name}</b>
      <a href="${link}">Clique para aceitar</a>
    `;

    return t;
  }
}
