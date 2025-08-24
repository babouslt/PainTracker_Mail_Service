import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import apiRouter from "./routes";
const cors = require("cors");

const app: Application = express();

// Configuration depuis le fichier .env
const config = {
  MONGODB_USER: process.env.MONGODB_USER,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_CLUSTER: process.env.MONGODB_CLUSTER,
  PORT: process.env.PORT || 3005,
  JWT_SECRET: process.env.JWT_SECRET,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${config.MONGODB_USER}:${config.MONGODB_PASSWORD}@${config.MONGODB_CLUSTER}`
  )
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`🎉 MailService démarré sur le port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB:", err);
    // Démarrer quand même le service pour les tests
    app.listen(config.PORT, () => {
      console.log(
        `🎉 MailService démarré sur le port ${config.PORT} (sans MongoDB)`
      );
    });
  });

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use("/api/", apiRouter);

export default app;
