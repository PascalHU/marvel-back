const express = require("express");
const router = express.Router();
const axios = require("axios");

const User = require("../models/User");

router.post("/favorite", async (req, res) => {
  try {
    const result = await User.findById(req.fields.userId).select(
      "_id token favorites"
    );
    if (req.fields.type === "character") {
      if (req.fields.addOrRemove === "add") {
        result.favorites.character.set(req.fields.idToChange, true);
      } else {
        result.favorites.character.set(req.fields.idToChange, undefined);
      }
    } else {
      if (req.fields.addOrRemove === "add") {
        result.favorites.comic.set(req.fields.idToChange, true);
      } else {
        result.favorites.comic.set(req.fields.idToChange, undefined);
      }
    }
    await result.save();
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.response });
  }
});

router.post("/findfavorites", async (req, res) => {
  try {
    const character = Object.keys(req.fields.list.character);
    const comic = Object.keys(req.fields.list.comic);
    const characterResultArray = [];
    const comicResultArray = [];
    for (let i = 0; i < character.length; i++) {
      const characterResult = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/character/${character[i]}?apiKey=${process.env.MARVEL_API_KEY}`
      );
      characterResultArray.push(characterResult.data);
    }
    for (let i = 0; i < comic.length; i++) {
      const comicResult = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comic/${comic[i]}?apiKey=${process.env.MARVEL_API_KEY}`
      );
      comicResultArray.push(comicResult.data);
    }
    const result = {
      characters: characterResultArray,
      comics: comicResultArray,
    };
    console.log(result.characters);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.response });
  }
});
module.exports = router;
