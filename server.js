const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const utilities = require("./utilities/");
const session = require("express-session");
const pool = require("./database/");
const accountRoute = require("./routes/accountRoute");
const reviewRoute = require("./routes/reviewRoute"); // Importar reseñas
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

/* Middleware */
app.use(cookieParser());
app.use(utilities.checkJWTToken);
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      createTableIfMissing: true,
      pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: "sessionId",
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

/* View Engine */
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

/* RUTAS (Orden correcto) */
app.use(static);
app.get("/", utilities.handleErrors(baseController.buildHome)); // Home primero
app.use("/inv", inventoryRoute);
app.use("/account", accountRoute);
app.use("/review", reviewRoute); // Reseñas aquí

/* Error 404 (Al final de todo) */
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, it seems we lost that page." });
});

/* Error Handler */
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  let message =
    err.status == 404 ? err.message : "Oh no! There was a collision.";
  res.render("errors/error", { title: err.status || "Error", message, nav });
});

const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`app listening on localhost:${port}`);
});
