const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  try {
    const skipValue = Number(req.query.page) * 100 - 100;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&skip=${skipValue}&title=${req.query.title}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error.response);
  }
});

router.get("/comic", async (req, res) => {
  try {
    const result = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.query.id}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(result.data);
  } catch (error) {
    res.status(400).json(error.response);
  }
});

router.get("/allcomics", async (req, res) => {
  try {
    const result = [];
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
    );
    const maxPage = Math.ceil(response.data.count / 100);

    for (let i = 1; i <= maxPage; i++) {
      const favorites = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${
          process.env.MARVEL_API_KEY
        }&skip=${i * 100 - 100}`
      );
      console.log(i);

      for (let j = 0; j < favorites.data.results.length; j++) {
        result.push(favorites.data.results[j]);
      }
    }
    res.json(result);
  } catch (error) {
    res.status(400).json(error.response);
  }
});
module.exports = router;
