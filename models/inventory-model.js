const pool = require("../database/");

/* ***************************
 * Obtener todos los datos de clasificación
 * ************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name",
  );
}

module.exports = { getClassifications };
