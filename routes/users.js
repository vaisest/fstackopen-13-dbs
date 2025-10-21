import { Router } from "express";
import User from "../models/user.js";
import errorHandler from "./errorHandler.js";

const userRouter = Router();
// require a blog by middleware

userRouter.get("/", async (_req, res) => {
	const blogs = await User.findAll();
	res.json(blogs);
});

userRouter.post("/", async (req, res) => {
	const user = await User.create(req.body);
	res.json(user);
});

userRouter.put("/:id", async (req, res) => {
	// i feel like this should be url-encoded, but the course doesnt seem to mention it
	const user = await User.findOne({ username: req.params.username });
	// fail early so that the route doesnt run
	if (!user) {
		return res
			.status(404)
			.json({ error: `User with username '${req.params.id}' does not exist` });
	}
	user.name = req.body.name;
	user.save();
	res.json(user);
});

userRouter.use(errorHandler);

export default userRouter;
