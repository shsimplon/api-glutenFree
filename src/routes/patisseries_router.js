const express = require("express");
const { OK, CREATED } = require("../helpers/status_codes");
const {
  getAllPatisseries,
  getPatisserie,
  addPatisserie,
  updatePatisserie,
  deleteOne,
} = require("../controllers/patisseries_controller");
const router = express.Router();

router.get("/", async (request, response) => {
  const patisseries = await getAllPatisseries();
  response.status(OK).json(patisseries);
});

router.get("/:name", async (request, response) => {
  const patisserie = await getPatisserie(request.params.name);
  response.status(OK).json(patisserie);
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

    const newPatisserie = await addPatisserie(req.body);
    res.status(CREATED).json(newPatisserie);
  }
});
router.put("/:id", async (request, response) => {
  const patisserie = request.body;

  const patisserieUpdated = await updatePatisserie(
    request.params.id,
    patisserie
  );
  response.status(OK).json(patisserieUpdated);
});

router.delete("/:id", async (request, response) => {
  await deleteOne(request.params.id);
  response
    .status(OK)
    .json({ message: "La patisserie  est supprimé avec succès" });
});

module.exports = router;
