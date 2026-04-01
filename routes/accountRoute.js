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

module.exports = router;
