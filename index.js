import bodyParser from "body-parser";
import express from "express";
import blogRouter from "./routes/blogs.js";
import loginRouter from "./routes/login.js";
import userRouter from "./routes/users.js";
import { PORT } from "./util/config.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/blogs/", blogRouter);
app.use("/api/users/", userRouter);
app.use("/api/login/", loginRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
