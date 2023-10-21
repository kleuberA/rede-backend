import { AuthRepository } from "../../interfaces/controllers/repositories/auth/AuthRepository";

export class AuthUseCase {
	constructor(private readonly authRepository: AuthRepository) {}
	async login(email: string, password: string) {
		return await this.authRepository.login(email, password);
	}
}
