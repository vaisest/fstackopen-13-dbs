import { DataTypes } from "sequelize";
import sequelize from "../util/db.js";

const User = sequelize.define(
	"user",
	{
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		username: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
			// why dont we just call it email then
			validate: {
				isEmail: true,
			},
		},
	},
	{ underscored: true },
);

User.sync();

export default User;
