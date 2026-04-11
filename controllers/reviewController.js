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

revCont.deleteReview = async function (req, res) {
  const { review_id, inv_id, account_id } = req.body;
  await reviewModel.deleteReview(review_id, account_id);
  req.flash("notice", "Review deleted.");
  res.redirect("/inv/detail/" + inv_id);
};

revCont.addReview = async function (req, res) {
  const { review_text, inv_id, account_id } = req.body;

  // Server-side validation
  if (!review_text || review_text.trim().length === 0) {
    req.flash("notice", "Review text cannot be empty.");
    return res.redirect("/inv/detail/" + inv_id);
  }

  if (review_text.trim().length < 10) {
    req.flash("notice", "Review must be at least 10 characters.");
    return res.redirect("/inv/detail/" + inv_id);
  }

  const addResult = await reviewModel.addReview(
    review_text.trim(),
    inv_id,
    account_id,
  );

  if (addResult) {
    req.flash("notice", "Your review was successfully added!");
    res.redirect("/inv/detail/" + inv_id);
  } else {
    req.flash("notice", "Sorry, there was an error saving your review.");
    res.redirect("/inv/detail/" + inv_id);
  }
};

module.exports = revCont;
