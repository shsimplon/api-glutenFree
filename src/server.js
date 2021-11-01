const express = require("express");
const fileUpload = require("express-fileupload");

const helmet = require("helmet");
const morgan = require("morgan");
const _ = require("lodash");

const cookies = require("cookie-parser");
const isAuth = require("./middlewares/auth.middleware");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const routes = require("./routes");

const { notFoundHandler, errorLogger, errorHandler } = require("./middlewares");
//instantiate server
const server = express();

server.use(cors());
// Enable file upload using express-fileupload
server.use(
  fileUpload({
    createParentPath: true,
  })
);

//use les dependences
server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());

server.use(express.urlencoded({ extended: false }));
server.use(cookies());

// Static Files
server.use("/upload", express.static("public"));

server.use("/api", routes);
server.use(isAuth);

server.use(helmet.xssFilter());

server.use("*", notFoundHandler);
server.use(errorLogger);
server.use(errorHandler);

module.exports = server;
