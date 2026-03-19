// Recursos Necesarios
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");

// Ruta para construir la vista de inventario por clasificación
// El ":classificationId" es un parámetro variable
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/detail/:invId", utilities.handleErrors(invCont.getVehicleDetail));

module.exports = router;
