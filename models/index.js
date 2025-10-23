import Blog from "./blog.js";
import Readinglist from "./readinglist.js";
import User from "./user.js";

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: Readinglist, as: "readings" });
Blog.belongsToMany(User, { through: Readinglist, as: "readers" });

export { User, Blog, Readinglist };
