const express = require("express");
require("express-async-errors");
// const multer = require("multer");
// const upload = multer();

const restaurantsRouter = require("./restaurants_router");
const patisseriesRouter = require("./patisseries_router");
const recettesRouter = require("./recettes_router");
const userRouter = require("./users_router.js");
const likeRouter = require("./likes_router");
const uploadController = require("./upload_router");

const mainRouter = express.Router();

mainRouter.use("/restaurants", restaurantsRouter);
mainRouter.use("/patisseries", patisseriesRouter);
mainRouter.use("/recettes", recettesRouter);
mainRouter.use("/users", userRouter);

//unpload

//   mainRouter.use('/uploaduser',uploadController);

//Likes
mainRouter.use("/likes", likeRouter);

module.exports = mainRouter;
