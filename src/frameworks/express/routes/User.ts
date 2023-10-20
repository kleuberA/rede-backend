import { Router } from "express";
import { ExpressAdapter } from "../../../interfaces/controllers/repositories/adapters/ExpressAdapter";
import { CreateUserRepository } from "../../../interfaces/controllers/repositories/user/CreateUserRepository";
import { CreateUserUseCase } from "../../../use_cases/user/CreateUserUseCase";
import { UserController } from "../../../interfaces/controllers/user/UserController";

const userRoute = Router();

const userRepository = new CreateUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

userRoute.post(
	"/createuser",
	ExpressAdapter.adaptRoute(userController.createUser.bind(userController))
);

export { userRoute };
