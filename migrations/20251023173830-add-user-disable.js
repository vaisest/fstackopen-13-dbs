import { DataTypes } from "sequelize";

/** @import {migrator} from "../util/db.js" */
/** @type {migrator['_types']['migration']} */
export const up = async ({ context: queryInterface }) => {
	await queryInterface.addColumn("users", "disabled", {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	});

	await queryInterface.createTable("sessions", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		jwt: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});
};
/** @type {migrator['_types']['migration']} */
export const down = async ({ context: queryInterface }) => {
	await queryInterface.removeColumn("users", "disabled");
	await queryInterface.dropTable("sessions");
};
