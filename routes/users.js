import { Router } from "express";
import { Blog, User } from "../models/index.js";
import { errorHandler } from "./middleware.js";
import { Op, Sequelize } from "sequelize";

const userRouter = Router();

userRouter.get("/", async (_req, res) => {
	const blogs = await User.findAll({
		include: {
			model: Blog,
			attributes: { exclude: ["user_id", "userId"] },
		},
	});
	res.json(blogs);
});

userRouter.get("/:id", async (req, res) => {
	const readFilter = req.query.read;

	/** @type  Parameters<typeof User.findByPk>[1] */
	const ops = {
		include: {
			association: "readings",
			attributes: { exclude: ["user_id", "readinglist"] },
		},
	};
	if (readFilter) {
		ops.include.where = {
			read: Sequelize.where(
				Sequelize.col("readings.readinglist.read"),
				Op.eq,
				readFilter === "true",
			),
		};
	}
	const blogs = await User.findByPk(req.params.id, ops);
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
