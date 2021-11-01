const { recette, user } = require("../models");
const { BadRequestError, NotFoundError } = require("../helpers/errors");
const { uploadErrors } = require("../utils/errors.utils");

const recettesController = {
  getAllRecettes: async () => {
    const listRecettes = await recette.findAll({
      order: [["name", "ASC"]],
      include: [
        {
          model: user,
          attributes: ["username"],
          as: "users",
        },
      ],
    });
    return listRecettes;
  },
  getuserRecette: async (userRecette) => {
    const Recette = await recette.findAll({
      where: {
        userId: userRecette,
      },
      include: [
        {
          model: user,
          attributes: ["username", "id"],
          as: "users",
        },
      ],
    });
    if (!Recette) {
      throw new NotFoundError(
        "Ressource introuvable",
        "Cette recette n'existe pas"
      );
    }

    return Recette;
  },
  //trouver une recette
  getOneRecette: async (id) => {
    const RecetteUne = await recette.findOne({
      where: {
        id,
      },
    });
    if (!RecetteUne) {
      throw new NotFoundError(
        "Ressource introuvable",
        "Cette recette n'existe pas"
      );
    }

    return RecetteUne;
  },

  addRecette: async (data, req, res) => {
    const { name, ingredients, preparations, image } = data;

    const Recette = await recette.findOne({
      where: {
        name,
      },
    });

    if (Recette) {
      throw new BadRequestError(
        "Ressource existante",
        "La Recette existe déjà"
      );
    }

    const newRecette = await recette.create(data);

    return newRecette;
  },

  updaterecette: async (id, data) => {
    const Recette = await recette.findOne({
      where: { id },
    });
    if (!Recette) {
      throw new NotFoundError("LA recette n'existe pas");
    }
    await Recette.update(data);

    const newRecette = await recette.findOne({
      where: {
        id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return newRecette;
  },

  deleteOne: async (id) => {
    const recetteFound = await recette.findOne({
      where: { id },
    });
    if (!recetteFound) {
      throw new NotFoundError(
        "Ressource introuvable",
        "Cette recette n'existe pas"
      );
    }

    await recette.destroy({
      where: { id },
    });
  },
};
module.exports = recettesController;
