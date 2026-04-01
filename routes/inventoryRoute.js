const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const invValidate = require("../utilities/inventory-validation");
const utilities = require("../utilities/");

// Route to management view (Task 1)
router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to add classification view (Task 2)
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification),
);

// Process add classification
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassData,
  utilities.handleErrors(invController.addClassification),
);

// Route to add inventory view (Task 3)
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory),
);

// Process add inventory
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory),
);

// Ruta para el AJAX de inventario
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON),
);

// Ruta para mostrar la vista de edición de un vehículo específico
router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.editInventoryView),
);

/* ***************************
 * Route to process the update (POST)
 * ************************** */
router.post(
  "/update/",
  invValidate.newInventoryRules(), // Reusamos las reglas de "add"
  invValidate.checkUpdateData, // Usaremos la nueva función de chequeo
  utilities.handleErrors(invController.updateInventory),
);

module.exports = router;
