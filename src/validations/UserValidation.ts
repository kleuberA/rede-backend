import { z } from "zod";

export const UserSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Campo name deverá conter no mínimo 3 caracteres." })
		.regex(/^[A-Za-z\s]+$/i, {
			message:
				"Name não pode conter números (123) ou caracteres especiais. ($%#$*;)",
		})
		.nonempty({ message: "Name é obrigatório." }),
	email: z.string().min(1, { message: "Email é obrigatório." }).email({
		message: "Coloque um email válido",
	}),
	password: z
		.string()
		.nonempty({
			message: "Password é obrigatório.",
		})
		.min(8, { message: "Password deverá conter no mínimo 8 caracteres." })
		.regex(/[a-z]+/, {
			message: "Deverá conter pelo menos 1 letra minúscula.",
		})
		.regex(/[A-Z]+/, {
			message: "Deverá conter pelo menos 1 letra maiúscula.",
		})
		.regex(/[@$!%*#?&]/, {
			message: "Deverá conter pelo menos 1 caractere especial.",
		})
		.regex(/[0-9]+/, { message: "Deverá conter pelo menos 1 número." }),
});

export type User = z.infer<typeof UserSchema>;
