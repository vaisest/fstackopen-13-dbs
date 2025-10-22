import { Router } from "express";
import { col, fn } from "sequelize";
import { Blog } from "../models/index.js";
import { errorHandler } from "./middleware.js";

const authorRouter = Router();

authorRouter.get("/", async (_req, res) => {
	const authors = await Blog.findAll({
		attributes: [
			"author",
			[fn("SUM", col("likes")), "likes"],
			[fn("COUNT", col("id")), "blogs"],
		],
		group: "author",
		order: [["likes", "DESC"]],
	});
	res.json(authors);
});

authorRouter.use(errorHandler);

export default authorRouter;
