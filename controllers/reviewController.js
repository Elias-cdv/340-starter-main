const reviewModel = require("../models/review-model");

const revCont = {};

/* ***************************
 * Procesar el envío de la reseña
 * ************************** */
revCont.addReview = async function (req, res) {
  const { review_text, inv_id, account_id } = req.body;

  const addResult = await reviewModel.addReview(
    review_text,
    inv_id,
    account_id,
  );

  if (addResult) {
    req.flash("notice", "¡Tu reseña se ha guardado con éxito!");
    res.redirect("/inv/detail/" + inv_id);
  } else {
    req.flash("notice", "Lo siento, hubo un error al guardar la reseña.");
    res.redirect("/inv/detail/" + inv_id);
  }
};

module.exports = revCont;
