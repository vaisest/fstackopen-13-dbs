import { Router } from "express";
import Blog from "../models/blog.js";
import errorHandler from "./errorHandler.js";

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
	const blogs = await Blog.findAll();
	res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
	const blog = await Blog.create(req.body);
	res.json(blog);
});

blogRouter.delete("/:id", blogFinder, async (req, res) => {
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
