// Recursos Necesarios
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");

// Ruta para construir la vista de inventario por clasificación
// El ":classificationId" es un parámetro variable
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.buildDetailView);
router.get("/trigger-error", invController.triggerError);

module.exports = router;
