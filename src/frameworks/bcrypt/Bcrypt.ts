import bcrypt from "bcrypt";

export interface IBcrypt {
	hash(password: string): Promise<string>;
	compare(password: string, hash: string): Promise<boolean>;
}

export class Bcrypt implements IBcrypt {
	async hash(password: string): Promise<string> {
		return bcrypt.hash(password, 12);
	}

	async compare(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}
