const { restaurant } = require("../models");

const { BadRequestError, NotFoundError } = require("../helpers/errors");

const restaurantController = {
  getAllRestaurants: async () => {
    const Restaurants = await restaurant.findAll({
      order: [["name", "ASC"]],
      raw: true,
    });
    return Restaurants;
  },
  getRestaurant: async (name) => {
    const Restaurant = await restaurant.findOne({
      where: {
        name,
      },
      attributes: ["id", "name"],
    });
    if (!Restaurant) {
      throw new BadRequestError("Le Restaurant n'existe pas");
    }
    return Restaurant;
  },
  addRestaurant: async (data, request) => {
    const { name, place, description, image, lien } = data;

    const Restaurant = await restaurant.findOne({
      where: {
        name,
      },
    });

    if (Restaurant) {
      throw new BadRequestError("Le Restaurant exist deja");
    } else {
      console.log(image);
      const newRestaurant = await restaurant.create({
        name,
        place,
        description,
        image,
        lien,
      });
      return newRestaurant;
    }
  },
  updateRestaurant: async (id, data) => {
    const Restaurant = await restaurant.findOne({
      where: { id },
    });
    if (!Restaurant) {
      throw new NotFoundError("LA recette n'existe pas");
    }
    await Restaurant.update(data);

    const newRestaurant = await restaurant.findOne({
      where: {
        id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return newRestaurant;
  },
  deleteOne: async (id) => {
    const restaurantFound = await restaurant.findOne({
      where: { id },
    });
    if (!restaurantFound) {
      throw new NotFoundError(
        "Ressource introuvable",
        "Ce restaurant n'existe pas"
      );
    }

    await restaurant.destroy({
      where: { id },
    });
  },
};

module.exports = restaurantController;
