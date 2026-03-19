const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {}; // ← esto faltaba, por eso truena

invCont.buildByClassificationId = utilities.handleErrors(
  async function (req, res, next) {
    const classification_id = req.params.classificationId;
    const data =
      await invModel.getInventoryByClassificationId(classification_id);
    const grid = await utilities.buildClassificationGrid(data);
    let nav = await utilities.getNav();
    const className = data[0].classification_name;
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    });
  },
);

invCont.buildDetailView = utilities.handleErrors(
  async function (req, res, next) {
    const inv_id = req.params.invId;
    const vehicle = await invModel.getInventoryByInvId(inv_id);
    const detailHTML = utilities.buildVehicleDetailHTML(vehicle);
    let nav = await utilities.getNav();
    res.render("./inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      detailHTML,
    });
  },
);

invCont.triggerError = utilities.handleErrors(async function (req, res, next) {
  throw new Error("Intentional 500 error triggered!");
});

module.exports = invCont;
