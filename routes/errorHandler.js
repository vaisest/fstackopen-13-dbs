const errorHandler = (err, _req, res, _next) => {
	if (err.name === "SequelizeValidationError") {
		const errorMessages = err.errors.map((it) => it.message);
		return res
			.status(400)
			.json({ error: `Validation errors: ${errorMessages}` });
	}
	if (err.name === "SequelizeDatabaseError") {
		return res.status(400).json({ error: `Database error: ${err.message}` });
	}
	res.status(500).json({ error: err.message });
};
export default errorHandler;
