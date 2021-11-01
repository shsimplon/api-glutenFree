// // Imports
const express = require("express");
const isAuth = require("../middlewares/auth.middleware");
const jwt = require("jsonwebtoken");
// const { signUpErrors, signInErrors } = require("../utils/errors.utils");

const { OK, CREATED } = require("../helpers/status_codes");
const {
  getAll,
  getOne,
  getByUserName,
  add,
  deleteOne,
  update,
} = require("../controllers/users_controller");
const { ValidationError } = require("../helpers/errors");

const router = express.Router();

router.get("/", async (request, response) => {
  const users = await getAll();
  response.status(OK).json(users);
});

router.post("/register", async (request, response) => {
  const user = request.body;

  const newUser = await add(user);
  response.status(CREATED).json(newUser);
});

router.get("/:id", isAuth, async (request, response) => {
  const user = await getOne(request.params.id);
  response.status(OK).json(user);
});

router.post("/login", async (request, response) => {
  const user = await getByUserName(request.body.email, request.body.password);

  const MAXAGE = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour of expiration
  response.cookie("jwt", user.token, { maxAge: MAXAGE });
  response.status(OK).json({ user: user, token: user.token });
});

router.put("/:id", isAuth, async (request, response) => {
  const user = request.body;

  const userUpdated = await update(request.params.id, user, request.user.id);
  response.status(OK).json(userUpdated);
});

router.delete("/:id", isAuth, async (request, response) => {
  await deleteOne(request.params.id);
  response.status(OK).json({ message: "L'user est supprimé avec succès" });
});

module.exports = router;
