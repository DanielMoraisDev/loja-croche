const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");

const account = "danielmoraisdev";
const password = "tm5x4wr2cJrkuskT";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "postgres",
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.error("[POSTGRES] Connected with success");
  } catch (error) {
    console.error("[POSTGRES] Connection failed");
  }
};
