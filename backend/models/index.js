const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");
db.role = require("./Role");
db.recipe = require("./Recipe")(mongoose)

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
