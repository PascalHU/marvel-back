const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  favorites: { character: { default: {} }, comic: { default: {} } },
});
module.exports = Favorite;
