const { recette, user, jaime } = require("../models");

const { BadRequestError, NotFoundError } = require("../helpers/errors");

const likesController = {
  add: async (data) => {
    const { userId, recetteId } = data;

    const LIKE = await jaime.findOne({
      where: {
        userId,
        recetteId,
      },
    });
    if (LIKE) {
      throw new BadRequestError(
        "Ressource existante",
        "cette recette est déja liké"
      );
    }

    const newjaime = await jaime.create(data);

    const Recette = await recette.findOne({
      where: { id: recetteId },
    });
    let like = 0;
    if (Recette.likes === null) {
      like = 0;
    }
    like = Recette.likes + 1;

    await Recette.update({ likes: like });

    return newjaime;
  },
};
module.exports = likesController;
