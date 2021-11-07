const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DBNAME = process.env.DBNAME;

/* 
app.use(cors());
*/

// capturar body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Conexión a Base de datos
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.dcjlt.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log("error db:", e));

// import routes
const authRoutes = require("./routes/auth");
const validaToken = require("./routes/validate-token");
const admin = require("./routes/admin");

// route middlewares
app.use("/api/user", authRoutes);
app.use("/api/admin", validaToken, admin);

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`);
});
