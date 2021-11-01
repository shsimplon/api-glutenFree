const { patisserie } = require("../models");

const { BadRequestError, NotFoundError } = require("../helpers/errors");

const patisserieController = {
  getAllPatisseries: async () => {
    const Patisseries = await patisserie.findAll({
      order: [["name", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
    });
    return Patisseries;
  },

  getPatisserie: async (name) => {
    const Patiiserie = await patisserie.findOne({
      where: {
        name,
      },
      attributes: ["id", "name"],
    });
    if (!Patiiserie) {
      throw new BadRequestError("La Patiiserie n'existe pas");
    }
    return Patiiserie;
  },
  addPatisserie: async (data, request) => {
    const { name, place, description, image, lien } = data;
    const Patisserie = await patisserie.findOne({
      where: {
        name,
        place,
        description,
      },
    });

    if (Patisserie) {
      throw new BadRequestError("La patisserie exist deja");
    } else {
      const newPatisserie = await patisserie.create({
        name,
        place,
        description,
        image,
        lien,
      });
      return newPatisserie;
    }
  },
  updatePatisserie: async (id, data) => {
    const Patisserie = await patisserie.findOne({
      where: { id },
    });
    if (!Patisserie) {
      throw new NotFoundError("LA patisserie n'existe pas");
    }
    await Patisserie.update(data);

    const newPatisserie = await patisserie.findOne({
      where: {
        id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return newPatisserie;
  },
  deleteOne: async (id) => {
    const patisserieFound = await patisserie.findOne({
      where: { id },
    });
    if (!patisserieFound) {
      throw new NotFoundError(
        "Ressource introuvable",
        "Cette patisserie n'existe pas"
      );
    }

    await patisserie.destroy({
      where: { id },
    });
  },
};
module.exports = patisserieController;
