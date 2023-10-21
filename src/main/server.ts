import express from "express";
import cors from "cors";

import rateLimit from "express-rate-limit";
import { userRoute } from "../frameworks/express/routes/User";
import { authRouter } from "../frameworks/express/routes/auth/Auth";

const app = express();
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 1000,
	message: "Muitas solicitações deste IP. Tente novamente mais tarde!",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(limiter);

app.use("/api/v1", userRoute);
app.use("/api/v1", authRouter);

app.use((_, res) => {
	res.status(404).send({
		message: "Não encontrado.",
		status: "error",
	});
});

app.listen(3001, () => {
	console.log(`🚀 Server running on http://localhost:${3001}`);
});
