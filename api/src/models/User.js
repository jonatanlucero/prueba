// models/User.js
import { DataTypes } from "sequelize";
import { sequelize } from "../dbPostgres.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    tableName: "usuarios", // nombre real de la tabla en la DB
    timestamps: false, // si no usás createdAt/updatedAt
  }
);
