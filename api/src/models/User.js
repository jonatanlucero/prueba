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

    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    // rol: {
    //   type: DataTypes.ENUM("admin", "moderador", "usuario"),
    //   allowNull: false,
    //   defaultValue: "usuario",
    // },

    rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
    //   defaultValue: "usuario",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING(200), // guardás hash, no la contraseña en texto plano
      allowNull: false,
    },

    manzana: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    casa: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: "usuarios", // nombre real de la tabla en la DB
    timestamps: false, // desactivás createdAt y updatedAt
  }
);
