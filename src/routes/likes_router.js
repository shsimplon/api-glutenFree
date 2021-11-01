const express = require("express");
const { OK, CREATED } = require("../helpers/status_codes");

const { djValidation } = require("../validators");
const { ValidationError } = require("../helpers/errors");
const likesController = require("../controllers/likes_controller");
const isAuth = require("../middlewares/auth.middleware.js");
const { add } = require("../controllers/likes_controller");
const router = express.Router();

module.exports = router;

router.post("/", async (request, response) => {
  const Likes = request.body;

  const newLikes = await add(Likes);
  response.status(CREATED).json(newLikes);
});
