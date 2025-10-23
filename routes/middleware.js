import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { SECRET } from "../util/config.js";

/** @import {ErrorHandler} from "express" */
/** @type {ErrorHandler} */
export const errorHandler = (err, _req, res, _next) => {
	if (err.name === "SequelizeValidationError") {
		const errorMessages = err.errors.map((it) => it.message);
		return res
			.status(400)
			.json({ error: `Validation errors: ${errorMessages}` });
	}
	if (err.name === "SequelizeDatabaseError") {
		return res.status(400).json({ error: `Database error: ${err.message}` });
	}
	console.error(err);
	res.sendStatus(500);
};

/** @import {RequestHandler} from "express" */
/** @type {RequestHandler} */
export const requireToken = async (req, res, next) => {
	const authorization = req.get("authorization");
	if (authorization?.toLowerCase().startsWith("bearer ")) {
		try {
			console.log(authorization.substring(7));

			req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
			req.user = await User.findOne({ username: req.decodedToken });
		} catch (error) {
			console.log(error);
			return res.status(401).json({ error: "Token invalid" });
		}
	} else {
		return res.status(401).json({ error: "Token missing" });
	}
	next();
};
