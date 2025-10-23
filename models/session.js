import { DataTypes } from "sequelize";
import sequelize from "../util/db.js";

const Session = sequelize.define(
	"sessions",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		jwt: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{ underscored: true, timestamps: false },
);

export default Session;
