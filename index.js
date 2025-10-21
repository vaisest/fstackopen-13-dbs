require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: "postgres",
});

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
console.log(Blog.tableName);

const main = async () => {
	try {
		await sequelize.authenticate();

		for (const { author, title, likes } of await Blog.findAll()) {
			console.log(`${author}: "${title}", ${likes} likes`);
		}
		sequelize.close();
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

main();
