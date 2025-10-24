import express from "express";
import cors from "cors";
import conn from "./src/db/postgres.js";
import routes from "./src/routes/router.js";

const app = express();

app.use(cors());
app.use(express.json());
conn.sync();

app.use("/api", routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("[BACKEND][APP] Servidor rodando na porta " + PORT);
});
