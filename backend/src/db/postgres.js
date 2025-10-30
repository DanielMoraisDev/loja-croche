import { Sequelize } from "sequelize";
import configs from "../config.js";

const database = configs.hosts.postgres.database;
const password = configs.hosts.postgres.password;
const user = configs.hosts.postgres.user;
const host = configs.hosts.postgres.host;
const port = configs.hosts.postgres.port;

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
