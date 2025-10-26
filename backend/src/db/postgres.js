import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);
import { Sequelize } from "sequelize";

const database = process.env.POSTGRES_DB;
const password = process.env.POSTGRES_PASSWORD;
const user = process.env.POSTGRES_USER;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;

const conn = new Sequelize(database, user, password, {
  host: host,
  port: port,
  dialect: "postgres",
});

try {
  conn.authenticate();
  console.error("[POSTGRES] Connected with success");
} catch (error) {
  console.error("[POSTGRES] Connection failed, error: " + error);
}

export default conn;
