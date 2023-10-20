import { UserExist } from "../../../../erros/UserExist";
import { Bcrypt } from "../../../../frameworks/bcrypt/Bcrypt";
import prisma from "../../../../frameworks/prisma/Prisma";
import { User } from "./../../../../entities/User";
import { UserRepository } from "./UserRepository";

export class CreateUserRepository implements UserRepository {
	private readonly bcrypt: Bcrypt = new Bcrypt();

	async create(user: User) {
		let { email, name, password } = user;
		let userExist = await prisma.user.findFirst({
			where: {
				email,
			},
		});
		if (userExist) {
			throw new UserExist();
		}
		let passwordHashed = await this.bcrypt.hash(password);

		await prisma.user.create({
			data: {
				...user,
				password: passwordHashed,
			},
		});
	}
}
