const { user } = require("../models");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../helpers/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getEncryptedPassword(password) {
  let error, encryptedPassword;

  encryptedPassword = await bcrypt.hash(password, 10);

  return encryptedPassword;
}

const userController = {
  getAll: async () => {
    const users = await user.findAll({
      order: [["username", "ASC"]],
      attributes: { exclude: ["dateCreated"] },
      raw: true,
    });
    return users;
  },

  getOne: async (id) => {
    const User = await user.findOne({
      where: {
        id,
      },
      attributes: { exclude: ["dateCreated"] },
    });
    if (!User) {
      throw new NotFoundError("Ressource introuvable", "Ce User n'existe pas");
    }

    return User;
  },

  getByUserName: async (email, password) => {
    const User = await user.findOne({
      where: {
        email,
      },
      attributes: { exclude: ["dateCreated"] },
    });
    if (!User) {
      throw new NotFoundError(
        // "Ressource introuvable",
        "cet utilisateur n'existe pas"
      );
    }

    let correct = await bcrypt.compare(password, User.password);
    if (correct) {
      const MAXAGE = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour of expiration
      User.exp = MAXAGE;
      token = await jwt.sign(JSON.stringify(User), process.env.JWT_SECRET);
      User.token = token;
      return User;
    } else {
      throw new UnauthorizedError("Mot de passe n'est pas correct");
    }
  },

  add: async (data) => {
    const { email, password } = data;

    const User = await user.findOne({
      where: {
        email,
      },
    });

    if (User) {
      throw new BadRequestError("Ressource existante", "Cet email existe déjà");
    }
    data.password = await getEncryptedPassword(password);

    console.log(data.password);
    const newUser = await user.create(data);

    return newUser;
  },

  update: async (id, data) => {
    const userFound = await user.findOne({
      where: { id },
    });
    if (!userFound) {
      throw new NotFoundError("Ressource introuvable", "Ce User n'existe pas");
    }

    await userFound.update(data);

    const User = await user.findOne({
      where: {
        id,
      },
      attributes: { exclude: ["dateCreated"] },
    });

    return User;
  },

  deleteOne: async (id) => {
    const userFound = await user.findOne({
      where: { id },
    });
    if (!userFound) {
      throw new NotFoundError("Ressource introuvable", "Ce User n'existe pas");
    }

    await user.destroy({
      where: { id },
    });
  },
};

module.exports = userController;
