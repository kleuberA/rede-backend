import { UserRepository } from "../../interfaces/controllers/repositories/user/UserRepository";
import { UserSchema, User } from "../../validations/UserValidation";

export class CreateUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}
	async execute(user: User) {
		const validationUser = UserSchema.parse(user);
		if (validationUser) {
			await this.userRepository.create(user);
		} else {
			throw new Error("Dados do usuário estão incorretos.");
		}
	}
}
