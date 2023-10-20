import { Request, Response } from "express";

export class ExpressAdapter {
	static adaptRoute(controller: any) {
		return async (req: Request, res: Response) => {
			try {
				const result = await controller(req, res);
				res.json(result);
			} catch (error) {
				res.status(500).json({ error: "Internal Server Error" });
			}
		};
	}
}
