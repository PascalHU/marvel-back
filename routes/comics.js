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

module.exports = router;
