import bodyParser from "body-parser";
import express from "express";
import { Blog, User } from "./models/index.js";
import authorRouter from "./routes/authors.js";
import blogRouter from "./routes/blogs.js";
import loginRouter from "./routes/login.js";
import logoutRouter from "./routes/logout.js";
import readinglistRouter from "./routes/readinglists.js";
import userRouter from "./routes/users.js";
import { PORT } from "./util/config.js";

const app = express();

// dev seed
const admin =
	(await User.findOne({ where: { username: "vaiser@vmail.me" } })) ||
	(await User.create({
		username: "vaiser@vmail.me",
		name: "vaiser",
	}));
if (!(await Blog.findOne({ where: { title: "Writing Resilient Components" } })))
	Blog.create({
		author: "Dan Abramov",
		title: "Writing Resilient Components",
		url: "https://helsinki.fi",
		year: 1999,
		user_id: admin.id,
	});
if (
	!(await Blog.findOne({
		where: { title: "Is High Quality Software Worth the Cost?" },
	}))
)
	Blog.create({
		author: "Martin Fowler",
		title: "Is High Quality Software Worth the Cost?",
		url: "https://helsinki.fi",
		year: 1998,
		user_id: admin.id,
	});
if (!(await Blog.findOne({ where: { title: "FP vs. OO List Processing" } })))
	Blog.create({
		author: "Robert C. Martin",
		title: "FP vs. OO List Processing",
		url: "https://helsinki.fi",
		year: 1997,
		user_id: admin.id,
	});

app.use(bodyParser.json());

app.use("/api/blogs/", blogRouter);
app.use("/api/users/", userRouter);
app.use("/api/login/", loginRouter);
app.use("/api/authors/", authorRouter);
app.use("/api/readinglists/", readinglistRouter);
app.use("/api/logout", logoutRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
