export class UserExist extends Error {
	constructor() {
		super("Este email ja esta cadastrado.");
	}
}
