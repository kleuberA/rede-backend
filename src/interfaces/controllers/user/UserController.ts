import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../use_cases/user/CreateUserUseCase";
import { ZodError, getErrorMap } from "zod";
import { UserExist } from "../../../erros/UserExist";

export class UserController {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {}
	async createUser(req: Request, res: Response) {
		try {
			const user = req.body;
			await this.createUserUseCase.execute(user);

			res.status(201).json({ message: "User created successfully" });
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(400).json({
					error: error.issues.map((errors) => {
						return errors.message;
					}),
					elementError: error.issues.map((errors) => {
						return errors.path;
					}),
				});
				return;
			}
			if (error instanceof UserExist) {
				res.status(400).json({
					error: "Este email ja esta cadastrado.",
				});
				return;
			}
			res.status(500).json({ error: "Internal Server Error." });
		}
	}
}
