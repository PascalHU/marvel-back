// import npm
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const formidable = require("express-formidable");
const app = express();
app.use(formidable());
app.use(cors());

// import & liaison bdd
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  res.json("🤯 Atchoum 🤧🤮");
});

const charactersRoute = require("./routes/characters");
app.use(charactersRoute);
const comicsRoute = require("./routes/comics");
app.use(comicsRoute);
const userRoute = require("./routes/user");
app.use(userRoute);
const favoritesRoute = require("./routes/favorites");
app.use(favoritesRoute);
app.listen(process.env.PORT, () => {
  console.log("Server Started 🚀🤯");
});
