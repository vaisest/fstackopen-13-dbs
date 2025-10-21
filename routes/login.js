import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { SECRET } from "../util/config.js";
import { errorHandler } from "./middleware.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
	const passwordCorrect = req.body.password === "secret";
	const user = await User.findOne({ username: req.body.username });
	if (!(passwordCorrect && user)) {
		return res.status(401).json({ error: "Invalid username or password" });
	}

	const token = jwt.sign(user.username, SECRET);

	res.json({ token, user });
});

loginRouter.use(errorHandler);

export default loginRouter;
