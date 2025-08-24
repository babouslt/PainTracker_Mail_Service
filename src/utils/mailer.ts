import nodemailer from "nodemailer";

// Configuration SMTP avec valeurs par défaut
const smtpConfig = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true pour 465, false pour les autres ports
  auth: {
    user: process.env.SMTP_USER || "your_email@gmail.com",
    pass: process.env.SMTP_PASSWORD || "your_app_password",
  },
};

// Créer le transporteur avec gestion d'erreur
let transporter: nodemailer.Transporter;

try {
  transporter = nodemailer.createTransport(smtpConfig);
} catch (error) {
  console.error("❌ Erreur lors de la création du transporteur SMTP:", error);
  // Créer un transporteur de test en cas d'erreur
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "test@ethereal.email",
      pass: "test",
    },
  });
}

export async function sendMail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER || "no-reply@paintracker.com",
      to,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email:", error);
    throw error;
  }
}

export function generateWelcomeMail() {
  const subject = "Bienvenue sur PainTracker !";
  const text = `Bienvenue sur PainTracker !\n\nBonjour,\n\nVotre compte vient d'être créé avec succès sur l'application PainTracker.\n\nVous pouvez dès maintenant vous connecter et commencer à suivre vos douleurs, leur évolution, et accéder à des analyses personnalisées.\n\n- Suivi simple et rapide de vos douleurs\n- Historique et évolution détaillée\n- Accès à l'analyse IA (selon votre abonnement)\n\nAccédez à l'application : https://paintracker.app\n\nSi vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer ce message.\n\nL'équipe PainTracker`;
  const html = `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
    <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #e0e7ef; padding: 32px;">
      <h2 style="color: #2563eb; margin-bottom: 12px;">Bienvenue sur PainTracker !</h2>
      <p>Bonjour,</p>
      <p>Votre compte vient d'être créé avec succès sur l'application <b>PainTracker</b>.</p>
      <p>
        Vous pouvez dès maintenant vous connecter et commencer à suivre vos douleurs, leur évolution, et accéder à des analyses personnalisées.
      </p>
      <ul>
        <li>Suivi simple et rapide de vos douleurs</li>
        <li>Historique et évolution détaillée</li>
        <li>Accès à l'analyse IA (selon votre abonnement)</li>
      </ul>
      <p style="margin-top: 24px;">
        <a href="https://paintracker.app" style="background: #2563eb; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Accéder à PainTracker</a>
      </p>
      <p style="color: #64748b; font-size: 13px; margin-top: 32px;">
        Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer ce message.
      </p>
      <p style="color: #64748b; font-size: 13px;">L'équipe PainTracker</p>
    </div>
  </body>
</html>`;
  return { subject, text, html };
}

export function generatePersonalizedWelcomeMail(firstName: string) {
  const subject = `Bienvenue ${firstName} sur PainTracker !`;
  const text = `Bienvenue sur PainTracker !\n\nBonjour ${firstName},\n\nVotre compte vient d'être créé avec succès sur l'application PainTracker.\n\nVous pouvez dès maintenant vous connecter et commencer à suivre vos douleurs, leur évolution, et accéder à des analyses personnalisées.\n\n- Suivi simple et rapide de vos douleurs\n- Historique et évolution détaillée\n- Accès à l'analyse IA (selon votre abonnement)\n\nAccédez à l'application : https://paintracker.app\n\nSi vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer ce message.\n\nL'équipe PainTracker`;
  const html = `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
    <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #e0e7ef; padding: 32px;">
      <h2 style="color: #2563eb; margin-bottom: 12px;">Bienvenue ${firstName} sur PainTracker !</h2>
      <p>Bonjour ${firstName},</p>
      <p>Votre compte vient d'être créé avec succès sur l'application <b>PainTracker</b>.</p>
      <p>
        Vous pouvez dès maintenant vous connecter et commencer à suivre vos douleurs, leur évolution, et accéder à des analyses personnalisées.
      </p>
      <ul>
        <li>Suivi simple et rapide de vos douleurs</li>
        <li>Historique et évolution détaillée</li>
        <li>Accès à l'analyse IA (selon votre abonnement)</li>
      </ul>
      <p style="margin-top: 24px;">
        <a href="https://paintracker.app" style="background: #2563eb; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Accéder à PainTracker</a>
      </p>
      <p style="color: #64748b; font-size: 13px; margin-top: 32px;">
        Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer ce message.
      </p>
      <p style="color: #64748b; font-size: 13px;">L'équipe PainTracker</p>
    </div>
  </body>
</html>`;
  return { subject, text, html };
}
