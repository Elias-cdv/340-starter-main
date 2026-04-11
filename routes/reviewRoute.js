const express = require("express");
const router = new express.Router();
const revCont = require("../controllers/reviewController");
const utilities = require("../utilities/");

// Ruta para procesar el formulario de reseña
router.post("/add", utilities.checkLogin, revCont.addReview);

router.post("/delete", utilities.checkLogin, revCont.deleteReview);

module.exports = router;
