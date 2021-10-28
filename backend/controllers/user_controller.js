const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

/*exports.updateRecord = (req, res) => {
  User.updateOne({ _id: ObjectId(req,body.id) },
  { $push: { favourites: { ObjectId: "5e1352793e9e6a804448db0e" } } }
)
};*/
