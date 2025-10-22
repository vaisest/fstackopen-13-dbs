import { DataTypes } from "sequelize";

/** @import {migrator} from "../util/db.js" */
/** @type {migrator['_types']['migration']} */
export const up = async ({ context: queryInterface }) => {
	await queryInterface.createTable("blogs", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
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
		created_at: { type: DataTypes.DATE },
		updated_at: { type: DataTypes.DATE },
	});
	await queryInterface.createTable("users", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
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
		created_at: { type: DataTypes.DATE },
		updated_at: { type: DataTypes.DATE },
	});
	await queryInterface.addColumn("blogs", "user_id", {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: { model: "users", key: "id" },
	});
};
/** @type {migrator['_types']['migration']} */
export const down = async ({ context: queryInterface }) => {
	await queryInterface.dropTable("blogs");
	await queryInterface.dropTable("users");
};
