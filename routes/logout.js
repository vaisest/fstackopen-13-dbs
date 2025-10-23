import { Router } from "express";
import { Session } from "../models/index.js";
import { errorHandler, requireToken } from "./middleware.js";

const logoutRouter = Router();

logoutRouter.delete("/", requireToken, async (req, res) => {
	const session = await Session.findOne({ jwt: req.encodedToken });
	if (!session) {
		res.sendStatus(200);
	}
	await session.destroy();
	res.json(session);
});

logoutRouter.use(errorHandler);

export default logoutRouter;
