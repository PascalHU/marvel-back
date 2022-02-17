const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    const skipValue = Number(req.query.page) * 100 - 100;
    const result = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&skip=${skipValue}&name=${req.query.name}`
    );
    res.json(result.data);
  } catch (error) {
    res.status(400).json(error.response);
  }
});

router.get("/character/", async (req, res) => {
  try {
    const result = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.query.id}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(result.data);
  } catch (error) {
    res.status(400).json(error.response);
  }
});

module.exports = router;
