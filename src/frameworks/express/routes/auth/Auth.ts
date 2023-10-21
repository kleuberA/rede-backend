import { Router } from "express";
import { AuthRepository } from "../../../../interfaces/controllers/repositories/auth/AuthRepository";
import { AuthUseCase } from "../../../../use_cases/auth/AuthUseCase";
import { AuthController } from "../../../../interfaces/controllers/auth/AuthController";

const authRouter = Router();

const authRepository = new AuthRepository();
const authUseCase = new AuthUseCase(authRepository);
const authController = new AuthController(authUseCase);

authRouter.post("/auth", authController.login.bind(authController));

export { authRouter };
