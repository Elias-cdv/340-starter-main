// Recursos Necesarios
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");

// Ruta para construir la vista de inventario por clasificación
// El ":classificationId" es un parámetro variable
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/detail/:invId", utilities.handleErrors(invCont.getVehicleDetail));

// Para la lista de carros:
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId),
);

// Para el detalle de UN carro:
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.getVehicleDetail),
);

module.exports = router;
