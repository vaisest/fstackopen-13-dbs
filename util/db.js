import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config.js";

const sequelize = new Sequelize(DATABASE_URL, {
	dialect: "postgres",
});

sequelize.authenticate();

export default sequelize;
