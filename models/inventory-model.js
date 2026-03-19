/* ***************************
 * Get specific inventory item by inv_id
 * ************************** */
async function getInventoryById(inv_id) {
  // <--- CAMBIA EL NOMBRE AQUÍ
  try {
    const data = await pool.query(
      "SELECT * FROM public.inventory WHERE inv_id = $1",
      [inv_id],
    );
    return data.rows[0];
  } catch (error) {
    return error.message;
  }
}

// EXPORTA LAS TRES FUNCIONES
module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById,
};
