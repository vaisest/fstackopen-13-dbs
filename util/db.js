import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";
import { DATABASE_URL } from "./config.js";

const sequelize = new Sequelize(DATABASE_URL, {
	dialect: "postgres",
});

sequelize.authenticate();

export const migrator = new Umzug({
	migrations: {
		glob: "migrations/*.js",
	},
	storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
	context: sequelize.getQueryInterface(),
	logger: console,
});
const migrations = await migrator.up();
console.log("Migrations up to date", {
	files: migrations.map((mig) => mig.name),
});

export default sequelize;
