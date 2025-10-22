import { DataTypes } from "sequelize";
import sequelize from "../util/db.js";

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
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		year: {
			type: DataTypes.INTEGER,
			validate: { min: 1991, max: new Date().getFullYear() },
		},
	},
	{ underscored: true },
);

export default Blog;
