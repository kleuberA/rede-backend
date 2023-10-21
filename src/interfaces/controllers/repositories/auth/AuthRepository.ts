import { Bcrypt } from "../../../../frameworks/bcrypt/Bcrypt";
import { Jwt } from "../../../../frameworks/jwt/Jwt";
import prisma from "../../../../frameworks/prisma/Prisma";
import env from "../../../../main/config/env";

type TUser = {
	id: string;
	email: string;
};

export interface IAuthRepository {
	login(email: string, password: string): Promise<string>;
}

export class AuthRepository implements IAuthRepository {
	private readonly bcrypt: Bcrypt = new Bcrypt();
	private readonly jwt: Jwt = new Jwt();

	async login(email: string, password: string): Promise<string> {
		const user = await prisma.user.findUnique({
			where: {
				email: email.toLowerCase(),
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		const passwordMatch = await this.bcrypt.compare(
			password,
			user.password
		);

		if (!passwordMatch) {
			throw new Error("Password does not match");
		}

		const token = this.generateToken(user);
		const refreshToken = this.generateRefreshToken(user);

		return JSON.stringify({
			token,
			refreshToken,
			user: {
				id: user.id,
			},
		});
	}
	private generateToken(user: TUser): string {
		const token = this.jwt.sign(user, env.jwtSecret, {
			expiresIn: "1d",
		});
		return token;
	}
	private generateRefreshToken(user: TUser): string {
		const refreshToken = this.jwt.sign(user, env.jwtSecret, {
			expiresIn: "30d",
		});
		return refreshToken;
	}
}
