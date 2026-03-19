/* ***************************
 * Entregar vista de detalle de vehículo
 * ************************** */
invCont.getVehicleDetail = async function (req, res, next) {
  const inv_id = req.params.invId;
  const data = await invModel.getInventoryById(inv_id);

  // Usamos la utilidad que ya creaste
  const detailView = await utilities.buildVehicleDetailsHtml(data);
  let nav = await utilities.getNav();
  const vehicleName = `${data.inv_year} ${data.inv_make} ${data.inv_model}`;

  res.render("./inventory/detail", {
    title: vehicleName,
    nav,
    detailView,
  });
};

module.exports = invCont;
