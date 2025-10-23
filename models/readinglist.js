import { DataTypes } from "sequelize";
import sequelize from "../util/db.js";

const Readinglist = sequelize.define(
	"readinglist",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		blog_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: "blog", key: "id" },
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: "user", key: "id" },
		},
		read: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{ underscored: true },
);

export default Readinglist;
