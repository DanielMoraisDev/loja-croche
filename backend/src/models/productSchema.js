import conn from "../db/postgres.js";
import { DataTypes } from "sequelize";

const table_mysql = "products";

const Product = conn.define(
  table_mysql,
  {
    id_product: {
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
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true,
    },
    image_object_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true,
    },
  },
  {
    tableName: table_mysql,
  }
);

export default Product;
