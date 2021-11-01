const { isNil } = require("lodash");
// // * Checks if `value` is `null` or `undefined`.
const nameValidation = (name) => {
  if (isNil(name) || name === "") {
    return "Le nom doit être renseigné";
  }
  if (typeof name !== "string") {
    return "Le nom doit être une chaîne de caractères";
  }
  if (name.length < 3 || name.length > 100) {
    return "Le nom doit contenir entre 3 et 100 caractères";
  }
  return null;
};
const descriptionValidation = (description) => {
  if (isNil(description) || description === "") {
    return "La description doit être renseigné";
  }
  if (typeof description !== "string") {
    return "La description doit être une chaîne de caractères";
  }
  if (description.length < 5 || description.length > 50000) {
    return "La description doit contenir entre 5 et 50000 caractères";
  }
  return null;
};
const placeValidation = (place) => {
  if (isNil(place) || place === "") {
    return "La place doit être renseigné";
  }
  if (typeof place !== "string") {
    return "La place doit être une chaîne de caractères";
  }
  if (place.length < 5 || place.length > 10000) {
    return "La place doit contenir entre 5 et 10000 caractères";
  }
  return null;
};
const ingredientsValidation = (ingredients) => {
  if (isNil(ingredients) || ingredients === "") {
    return "Les ingredients doit être renseigné";
  }

  return null;
};
const preparationsValidation = (preparations) => {
  if (isNil(preparations) || preparations === "") {
    return "La preparation doit être renseigné";
  }

  return null;
};

module.exports = (data) => {
  const {
    name,
    place,

    description,
    preparations,

    ingredients,
  } = data;

  const errors = [];

  //etablissements
  const nameError = nameValidation(name);
  if (nameError) errors.push({ field: "name", message: nameError });

  const placeError = placeValidation(place);
  if (placeError) errors.push({ field: "place", message: placeError });

  const desciptionError = descriptionValidation(description);
  if (desciptionError)
    errors.push({ field: "desciption", message: desciptionError });
  const preparationsError = preparationsValidation(preparations);
  if (preparationsError)
    errors.push({ field: "preparations", message: preparationsError });

  const ingredientsError = ingredientsValidation(ingredients);
  if (ingredientsError)
    errors.push({ field: "ingredients", message: ingredientsError });
};
