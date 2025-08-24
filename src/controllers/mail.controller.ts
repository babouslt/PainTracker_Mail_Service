import { Request, Response } from "express";
import {
  sendMail,
  generateWelcomeMail,
  generatePersonalizedWelcomeMail,
} from "../utils/mailer";

export async function sendMailController(req: Request, res: Response) {
  const { to, firstName } = req.body;

  if (!to || to.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Champ requis : to" });
  }

  try {
    let subject: string, text: string, html: string;

    if (firstName) {
      // Email personnalisé avec le prénom
      const mailContent = generatePersonalizedWelcomeMail(firstName);
      subject = mailContent.subject;
      text = mailContent.text;
      html = mailContent.html;
    } else {
      // Email générique
      const mailContent = generateWelcomeMail();
      subject = mailContent.subject;
      text = mailContent.text;
      html = mailContent.html;
    }

    await sendMail({ to, subject, text, html });
    res.json({ success: true, message: "Email envoyé avec succès" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de l'email",
      error: (error as Error).message,
    });
  }
}
