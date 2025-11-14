import conn from "../db/postgres.js";
import { DataTypes } from "sequelize";

export const table_mysql = "users";

const User = conn.define(
  table_mysql,
  {
    id_user: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      required: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
  },
  {
    tableName: table_mysql,
  }
);

export default User;
