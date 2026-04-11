const pool = require("../database/");

/* ***************************
 * Añadir nueva reseña
 * ************************** */
async function addReview(review_text, inv_id, account_id) {
  try {
    const sql =
      "INSERT INTO reviews (review_text, inv_id, account_id) VALUES ($1, $2, $3) RETURNING *";
    return await pool.query(sql, [review_text, inv_id, account_id]);
  } catch (error) {
    return error.message;
  }
}

/* ***************************
 * Obtener reseñas por ID de vehículo
 * ************************** */
async function getReviewsByInvId(inv_id) {
  try {
    const sql =
      "SELECT r.review_text, r.review_date, a.account_firstname, a.account_lastname FROM reviews r JOIN account a ON r.account_id = a.account_id WHERE r.inv_id = $1 ORDER BY r.review_date DESC";
    const data = await pool.query(sql, [inv_id]);
    return data.rows;
  } catch (error) {
    console.error("getReviewsByInvId error: " + error);
  }
}

async function deleteReview(review_id, account_id) {
  try {
    const sql = "DELETE FROM reviews WHERE review_id = $1 AND account_id = $2";
    return await pool.query(sql, [review_id, account_id]);
  } catch (error) {
    console.error("deleteReview error: " + error);
  }
}
module.exports = { addReview, getReviewsByInvId, deleteReview };

module.exports = { addReview, getReviewsByInvId };
