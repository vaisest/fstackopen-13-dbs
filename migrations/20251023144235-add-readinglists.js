import { DataTypes } from "sequelize";

/** @import {migrator} from "../util/db.js" */
/** @type {migrator['_types']['migration']} */
export const up = async ({ context: queryInterface }) => {
	await queryInterface.createTable("readinglists", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		blog_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		read: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		created_at: { type: DataTypes.DATE },
		updated_at: { type: DataTypes.DATE },
	});
};
/** @type {migrator['_types']['migration']} */
export const down = async ({ context: queryInterface }) => {
	await queryInterface.dropTable("readinglists");
};
