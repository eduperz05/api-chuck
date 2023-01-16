import { Response } from "express";
import nodemailer from "nodemailer"; 

export interface EmailHelper {
  validator(email: string): boolean;
}
export class EmailHelperNodemailer implements EmailHelper {

  private regex: RegExp;
  private transporter: nodemailer.Transporter;

  constructor() {
    this.regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.transporter = nodemailer.createTransport({
      port: Number(process.env.EMAIL_PORT), // true for 465, false for other ports
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: true,
    });
  }

  public validator(email: string): boolean {
    return this.regex.test(email);
  }

  public sendEmail(mailData: object, res: Response) {
    this.transporter.sendMail(mailData, (error, info) => {
      if (error) {
        throw new Error("Coudn't send the email");
      }
      res.status(200).send({
        message: "Email send",
        message_id: info.message,
        mailData
      });
    });
  }
}