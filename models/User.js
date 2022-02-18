const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  account: {
    username: {
      required: true,
      type: String,
    },
  },
  token: String,
  hash: String,
  salt: String,
  favorites: {
    character: { type: Map, of: Boolean },
    comic: { type: Map, of: Boolean },
  },
});
module.exports = User;
