const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

router.get(
  "/",
  utilities.checkLogin,
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

// Entregar la vista de update
router.get(
  "/update/:id",
  utilities.checkLogin,
  accountController.buildUpdateView,
);

// Procesar el update de datos
router.post(
  "/update",
  utilities.checkLogin,
  regValidate.updateRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount),
);

// Procesar el update de password
router.post(
  "/update-password",
  utilities.checkLogin,
  regValidate.passwordRules(),
  regValidate.checkPasswordData,
  utilities.handleErrors(accountController.updatePassword),
);

router.get("/logout", utilities.handleErrors(accountController.accountLogout));

module.exports = router;
