import Blog from "./blog.js";
import Readinglist from "./readinglist.js";
import Session from "./session.js";
import User from "./user.js";

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: Readinglist, as: "readings" });
Blog.belongsToMany(User, { through: Readinglist, as: "readers" });

Session.belongsTo(User);
User.hasMany(Session);

export { User, Blog, Readinglist, Session };
