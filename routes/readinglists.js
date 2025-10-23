import { Router } from "express";
import { Blog, Readinglist } from "../models/index.js";
import { errorHandler, requireToken } from "./middleware.js";

const readinglistRouter = Router();

readinglistRouter.post("/", async (req, res) => {
	const readinglist = await Readinglist.create(req.body);
	res.json(readinglist);
});

readinglistRouter.put("/:id", requireToken, async (req, res) => {
	const blog = await Blog.findByPk(req.params.id);
	if (!blog) {
		res.sendStatus(404);
	}
	const { read } = req.body;
	const reading = await Readinglist.findOne({
		user_id: req.user.id,
		blog_id: blog.id,
	});
	reading.read = read;

	res.json(await reading.save());
});

readinglistRouter.use(errorHandler);

export default readinglistRouter;
