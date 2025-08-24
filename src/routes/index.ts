import express from "express";
import mailRoutes from "./mail.route";
const router = express.Router();

// Route d'envoi d'email
router.use("/mail", mailRoutes);

export default router;
