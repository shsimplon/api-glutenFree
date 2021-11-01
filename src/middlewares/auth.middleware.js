const jwt = require("jsonwebtoken");
const user = require("../models/user");
const { UnauthorizedError } = require("../helpers/errors");

// verification de token
const isAuth = (request, response, next) => {
  //const token = request.cookies.jwt;
  const token = request.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      console.log(error);
      throw new UnauthorizedError("You must be login");
    } else {
      const { exp } = user;

      if (Date.now() / 1000 >= exp) {
        response.clearCookie("jwt");

        throw new UnauthorizedError("You must be login");
      }
      request.user = user;

      next();
    }
  });
};
module.exports = isAuth;
