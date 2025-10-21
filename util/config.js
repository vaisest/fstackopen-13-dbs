import "dotenv/config";

if (process.env.DATABASE_URL === undefined) {
	throw new Error("Env var `DATABASE_URL must be defined`");
}
export const { DATABASE_URL } = process.env;
export const PORT = process.env.PORT || 3001;
