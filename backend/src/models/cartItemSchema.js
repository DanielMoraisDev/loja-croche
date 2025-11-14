import conn from "../db/postgres.js";
import { DataTypes } from "sequelize";
import { table_mysql as table_products } from "./productSchema.js";
import { table_mysql as table_users } from "./userSchema.js";

const table_mysql = "cart_items";

const CartItem = conn.define(
  table_mysql,
  {
    id_cart_item: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      required: true,
    },
    id_user: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: table_users,
        key: "id_user",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    id_product: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: table_products,
        key: "id_product",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: table_mysql,
  }
);

CartItem.belongsTo(User, { foreignKey: "id_user" });
User.hasMany(CartItem, { foreignKey: "id_user" });

CartItem.belongsTo(Product, { foreignKey: "id_product" });
Product.hasMany(CartItem, { foreignKey: "id_product" });

export default CartItem;
