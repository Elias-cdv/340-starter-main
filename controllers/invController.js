const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

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

/* ***************************
 * Task 1: Deliver Management View
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
  });
};

/* ***************************
 * Task 2: Deliver Add Classification View
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  });
};

/* ***************************
 * Task 2: Process Add Classification
 * ************************** */
invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body;
  const result = await invModel.insertClassification(classification_name);

  if (result) {
    let nav = await utilities.getNav(); // Reconstruye para mostrar el nuevo link
    req.flash(
      "notice",
      `The ${classification_name} classification was successfully added.`,
    );
    res
      .status(201)
      .render("inventory/management", {
        title: "Inventory Management",
        nav,
        errors: null,
      });
  } else {
    let nav = await utilities.getNav();
    req.flash("notice", "Sorry, adding the classification failed.");
    res
      .status(501)
      .render("inventory/add-classification", {
        title: "Add New Classification",
        nav,
        errors: null,
      });
  }
};

/* ***************************
 * Task 3: Deliver Add Inventory View
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classificationSelect = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classificationSelect,
    errors: null,
  });
};

/* ***************************
 * Task 3: Process Add Inventory
 * ************************** */
invCont.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
  } = req.body;

  const result = await invModel.insertInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  );

  if (result) {
    req.flash("notice", `The ${inv_make} ${inv_model} was successfully added.`);
    res
      .status(201)
      .render("inventory/management", {
        title: "Inventory Management",
        nav,
        errors: null,
      });
  } else {
    let classificationSelect =
      await utilities.buildClassificationList(classification_id);
    req.flash("notice", "Sorry, adding the vehicle failed.");
    res.status(501).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      errors: null,
      // Aquí está el STICKINESS devolviendo los datos
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });
  }
};

module.exports = invCont;
