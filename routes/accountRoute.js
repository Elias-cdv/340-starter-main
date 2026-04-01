const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

// Default route for account management
router.get(
  "/",
  utilities.checkJWTToken,
  utilities.handleErrors(accountController.buildManagementView),
);

router.get("/login", utilities.handleErrors(accountController.buildLogin));
// Route to build registration view
router.get(
  "/registration",
  utilities.handleErrors(accountController.buildRegister),
);

// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount),
);

// Login
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin),
);

/* ****************************************
 * Deliver management view
 * *************************************** */
async function buildManagementView(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/management", {
    title: "Account Management",
    nav,
    errors: null,
  });
}

// AQUÍ SÍ EXPORTAS TODAS LAS FUNCIONES COMO UN OBJETO:
module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
  accountLogin, // Esta es la del JWT
  buildManagementView, // Esta es la que acabamos de mover
};
