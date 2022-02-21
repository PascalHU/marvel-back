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

router.get("/allcharacters", async (req, res) => {
  try {
    const result = [];
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
    );
    const maxPage = Math.ceil(response.data.count / 100);

    for (let i = 1; i <= maxPage; i++) {
      const characters = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${
          process.env.MARVEL_API_KEY
        }&skip=${i * 100 - 100}`
      );
      console.log(i);
      for (let j = 0; j < characters.data.results.length; j++) {
        result.push(characters.data.results[j]);
      }
    }
    res.json(result);
  } catch (error) {
    res.status(400).json(error.response);
  }
});
module.exports = router;
