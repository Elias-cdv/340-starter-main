const pool = require("../database/");

/* ***************************
 * Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name",
  );
}

async function getInventoryByInvId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.inv_id = $1`,
      [inv_id],
    );
    return data.rows[0];
  } catch (error) {
    console.error("getInventoryByInvId error " + error);
  }
}

// AQUÍ ESTABA EL ERROR: Asegúrate de que los nombres coincidan exactamente
module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryByInvId,
};
