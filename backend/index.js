const express = require("express");
const cors = require("cors");
const app = express();

const conn = require("./db/conn.js");
// const routes = require("./routes/router.js");

app.use(cors());
app.use(express.json());
conn();

// app.use('/api', routes)

const PORT = 3000;

app.listen(PORT, () => {
  console.log("[BACKEND][APP] Servidor rodando na porta " + PORT);
});
