import { Router } from "express";
import Blog from "../models/blog.js";

const blogRouter = Router();
blogRouter.get("/", async (_req, res) => {
	const notes = await Blog.findAll();
	res.json(notes);
});

blogRouter.post("/", async (req, res) => {
	try {
		console.log(req.body);
		const blog = await Blog.create(req.body);
		res.json(blog);
	} catch (error) {
		res.status(400).json({ error });
	}
});

blogRouter.delete("/:id", async (req, res) => {
	console.log(req.params.id);
	const blog = await Blog.findByPk(req.params.id);
	if (blog === null) {
		return res.status(404);
	}
	await blog.destroy();
	res.json(blog);
});

export default blogRouter;
