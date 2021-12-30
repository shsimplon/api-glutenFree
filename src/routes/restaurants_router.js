const express = require("express");
const { OK, CREATED } = require("../helpers/status_codes");

const {
  getAllRestaurants,
  getRestaurant,
  addRestaurant,
  updateRestaurant,
  deleteOne,
} = require("../controllers/restaurants_controller");
const router = express.Router();

router.get("/", async (request, response) => {
  const restaurants = await getAllRestaurants();
  response.status(OK).json(restaurants);
});
router.get("/:name", async (request, response) => {
  const restaurant = await getRestaurant(request.params.name);
  response.status(OK).json(restaurant);
});

router.post("/", async (req, res) => {
  if (!req.files) {
    return res.status(400).json({
      message: "vous devez uploadez une image",
    });
  }
  if (
    req.files.avatar.mimetype != "image/jpg" &&
    req.files.avatar.mimetype != "image/png" &&
    req.files.avatar.mimetype != "image/jpeg"
  ) {
    return res.status(405).json({
      message: "le format doit etre (jpg,png,jpeg)",
    });
  } else if (req.files.avatar.size > 1000000) {
    return res.status(405).json({
      message: "la taille doit etre inférieur à 10MB",
    });
  } else {
    let avatar = req.files.avatar;

    const img = avatar.data;
    const data = img.toString("base64");
    req.body.image = data;

    const newRestaurant = await addRestaurant(req.body);
    res.status(CREATED).json(newRestaurant);
  }
});
router.put("/:id", async (request, response) => {
  const restaurant = request.body;

  const restaurantUpdated = await updateRestaurant(
    request.params.id,
    restaurant
  );
  response.status(OK).json(restaurantUpdated);
});

router.delete("/:id", async (request, response) => {
  await deleteOne(request.params.id);
  response
    .status(OK)
    .json({ message: "Le restaurant  est supprimé avec succès" });
});

module.exports = router;
