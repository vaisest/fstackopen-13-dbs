import { Router } from "express";
import { Blog, User } from "../models/index.js";
import { errorHandler, requireToken } from "./middleware.js";

const blogRouter = Router();
// require a blog by middleware
const blogFinder = async (req, res, next) => {
	req.blog = await Blog.findByPk(req.params.id);
	// fail early so that the route doesnt run
	if (!req.blog) {
		res
			.status(404)
			.json({ error: `Blog with id '${req.params.id}' does not exist` });
	} else {
		next();
	}
};
blogRouter.get("/", async (_req, res) => {
	const blogs = await Blog.findAll({
		attributes: { exclude: ["user_id"] },
		include: {
			model: User,
			attributes: ["name"],
		},
	});
	res.json(blogs);
});

blogRouter.post("/", requireToken, async (req, res) => {
	const blog = await Blog.create({ ...req.body, user_id: req.user.id });
	res.json(blog);
});

blogRouter.delete("/:id", blogFinder, requireToken, async (req, res) => {
	if (req.blog.user_id !== req.user.id) {
		return res
			.status(403)
			.json({ error: "You are not authorized to access this" });
	}
	await req.blog.destroy();
	res.json(req.blog);
});

blogRouter.put("/:id", blogFinder, async (req, res) => {
	req.blog.likes = req.body.likes;
	await req.blog.save();
	res.json(req.blog);
});

blogRouter.use(errorHandler);

export default blogRouter;
