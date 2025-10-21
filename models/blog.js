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
	},
	{ underscored: true, timestamps: false },
);

Blog.sync();

export default Blog;
