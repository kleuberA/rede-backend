import { Request, Response } from "express";
import { AuthUseCase } from "../../../use_cases/auth/AuthUseCase";

export class AuthController {
	constructor(private readonly authUseCase: AuthUseCase) {}
	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const token = await this.authUseCase.login(email, password);

			const payload = JSON.parse(token);
			const tokenUser = payload.token;
			const refreshTokenUser = payload.refreshToken;
			const userId = payload.user;
			res.status(200)
				.cookie("id", userId.id, {
					httpOnly: true,
					secure: true,
					sameSite: "none",
				})
				.cookie("token", tokenUser, {
					httpOnly: true,
					secure: true,
					sameSite: "none",
				})
				.send({
					message: "User authenticated successfully",
					status: "success",
					token: tokenUser,
					refreshToken: refreshTokenUser,
					userId: userId,
				});
		} catch (error: any) {
			res.status(500).json({
				error: "Internal Server Error.",
				message: error.message,
			});
		}
	}
}
