const pool = require("../database/");

/* ***************************
 * Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name",
  );
}

<<<<<<< HEAD
async function getInventoryByInvId(inv_id) {
=======
/* ***************************
 * Get all inventory items by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
>>>>>>> 8b1744a3a7d6ab49d5ab80a736726edaed224165
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
<<<<<<< HEAD
    console.error("getInventoryByInvId error " + error);
  }
}

// AQUÍ ESTABA EL ERROR: Asegúrate de que los nombres coincidan exactamente
module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryByInvId,
=======
    console.error("getInventoryByClassificationId error " + error);
  }
}

/* ***************************
 * Get specific vehicle by inv_id (ESTA ES LA NUEVA PARA EL DETALLE)
 * ************************** */
async function getInventoryById(inv_id) {
  try {
    const data = await pool.query(
      "SELECT * FROM public.inventory WHERE inv_id = $1",
      [inv_id],
    );
    return data.rows[0]; // Retorna solo un vehículo
  } catch (error) {
    console.error("getInventoryById error " + error);
  }
}

// AQUÍ ESTABA TU ERROR: Tienes que exportar las TRES funciones
module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById,
>>>>>>> 8b1744a3a7d6ab49d5ab80a736726edaed224165
};
