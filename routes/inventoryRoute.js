const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const invValidate = require("../utilities/inventory-validation");
const utilities = require("../utilities/");

// Route to management view (Protegida)
router.get(
  "/",
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildManagement),
);

// Route to add classification view (Protegida)
router.get(
  "/add-classification",
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildAddClassification),
);

// Process add classification (Protegida)
router.post(
  "/add-classification",
  utilities.checkAccountType,
  invValidate.classificationRules(),
  invValidate.checkClassData,
  utilities.handleErrors(invController.addClassification),
);

// Route to add inventory view (Protegida)
router.get(
  "/add-inventory",
  utilities.checkAccountType,
  utilities.handleErrors(invController.buildAddInventory),
);

// Process add inventory (Protegida)
router.post(
  "/add-inventory",
  utilities.checkAccountType,
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory),
);

// Ruta para el AJAX de inventario (Esta se queda pública)
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON),
);

// Ruta para mostrar la vista de edición de un vehículo específico (Protegida)
router.get(
  "/edit/:inv_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.editInventoryView),
);

/* ***************************
 * Route to process the update (POST) (Protegida)
 * ************************** */
router.post(
  "/update/",
  utilities.checkAccountType,
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory),
);

// Ruta para mostrar la vista de confirmación de eliminación (Protegida)
router.get(
  "/delete/:inv_id",
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteView),
);

// Ruta para procesar la eliminación (Protegida)
router.post(
  "/delete/",
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteItem),
);

// Ruta para ver vehículos por clasificación (ESTA ES LA QUE TE DA EL 404 EN SPORTS)
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId),
);

// Ruta para ver el detalle de un vehículo específico
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildDetailView),
);

module.exports = router;
