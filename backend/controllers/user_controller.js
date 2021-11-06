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

exports.addToFavourites = (id, req) => {
  const userId = id.params.id;
  const addThisToFavourites = { $push: { favourites: id.body._id } };
  User.updateOne({ _id: userId }, addThisToFavourites, function (err, res) {
    if (err) throw err;
    console.log("Recipe added to favourites");
  });
};

exports.deleteFavourites = (id, req) => {
  const userId = id.params.id;
  const deleteThisFromFavourites = { $pull: { favourites: id.body._id } };
  User.updateOne(
    { _id: userId },
    deleteThisFromFavourites,
    function (err, res) {
      if (err) throw err;
      console.log("Recipe deleted from favourites");
    }
  );
};
