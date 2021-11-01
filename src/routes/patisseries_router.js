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

router.post("/", async (request, response) => {
  if (!request.files) {
    response.send({
      status: false,
      message: "No file uploaded",
    });
  } else {
    let avatar = request.files.avatar;
    const img = avatar.data;
    const data = img.toString("base64");
    request.body.image = data;
    await avatar.mv("./public/uploads/" + avatar.name);

    const newPatisserie = await addPatisserie(request.body);
    response.status(CREATED).json(newPatisserie);
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
