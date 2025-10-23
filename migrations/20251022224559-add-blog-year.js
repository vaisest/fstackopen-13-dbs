import { DataTypes } from "sequelize";

/** @import {migrator} from "../util/db.js" */
/** @type {migrator['_types']['migration']} */
export const up = async ({ context: queryInterface }) => {
	await queryInterface.addColumn("blogs", "year", {
		type: DataTypes.INTEGER,
		// sequelize doesn't seem to support constraints for this?
		validate: { min: 1991, max: new Date().getFullYear() },
	});
};
/** @type {migrator['_types']['migration']} */
export const down = async ({ context: queryInterface }) => {
	await queryInterface.removeColumn("blogs", "year");
};
