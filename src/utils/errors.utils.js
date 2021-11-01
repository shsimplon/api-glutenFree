// module.exports.signUpErrors = (values) => {
//   let errors = {};

//   if (!values.username === "" || values.username == null) {
//     errors.username = "Username required";
//   }
//   if (!values.email) {
//     errors.email = "Email required";
//   } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//     errors.email = "Email address is invalid";
//   }
//   //   if (!values.password) {
//   //     errors.password = "Password is required";
//   //   } else if (values.password.length < 6) {
//   //     errors.password = "Password needs to be 6 characters or more";
//   //   }

//   //   if (!values.password2) {
//   //     errors.password2 = "Password is required";
//   //   } else if (values.password2 !== values.password) {
//   //     errors.password2 = "Passwords do not match";
//   //   }

//   return errors;
// };

// module.exports.signInErrors = (err) => {
//   let errors = { email: "", password: "" };

//   if (err.message.includes("email")) errors.email = "Email incorrect";

//   if (err.message.includes("password"))
//     errors.password = "Le mot de passe ne correspond pas";

//   return errors;
// };

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("invalid file"))
    errors.format = "Format incompatabile";

  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors;
};
