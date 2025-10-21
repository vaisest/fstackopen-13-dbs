import express from "express";
import { DataTypes, Sequelize } from "sequelize";
import "dotenv/config";
import bodyParser from "body-parser";

if (process.env.DATABASE_URL) {
	throw new Error("Env var `DATABASE_URL must be defined`");
}
const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: "postgres",
});
const app = express();
app.use(bodyParser.json());

const Blog = sequelize.define(
	"blog",
	{
		author: {
			type: DataTypes.TEXT,
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		likes: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	},
	{ underscored: true, timestamps: false },
);

sequelize.authenticate();

Blog.sync();

app.get("/api/blogs", async (_req, res) => {
	const notes = await Blog.findAll();
	res.json(notes);
});

app.post("/api/blogs", async (req, res) => {
	try {
		console.log(req.body);
		const blog = await Blog.create(req.body);
		res.json(blog);
	} catch (error) {
		res.status(400).json({ error });
	}
});

app.delete("/api/blogs/:id", async (req, res) => {
	console.log(req.params.id);
	const blog = await Blog.findByPk(req.params.id);
	if (blog === null) {
		return res.status(404);
	}
	await blog.destroy();
	res.json(blog);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
