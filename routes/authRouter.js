import express from 'express'; 
import authController from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/me", authController.me);

export default authRouter;