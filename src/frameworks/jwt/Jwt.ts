import jwt from "jsonwebtoken";

export interface IJwt {
	sign(payload: any, secret: string, options?: any): string;
	verify(token: string, secret: string): any;
	decode(
		token: string,
		options?: object
	): null | { [key: string]: any } | string;
}
export class Jwt implements IJwt {
	sign(payload: object, secret: string, options?: object): string {
		return jwt.sign(payload, secret, options);
	}
	verify(token: string, secret: string, options?: object): object | string {
		return jwt.verify(token, secret, options);
	}
	decode(
		token: string,
		options?: object
	): null | { [key: string]: any } | string {
		return jwt.decode(token, options);
	}
}
