import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sequelize } from "../dbPostgres.js";
import { QueryTypes } from "sequelize";
import { JWT_SECRET } from "../config.js";
import { User } from "../models/User.js";
// import { sendMailResetPass } from "../emails/sendNodeMailer.js";

export const userAdd = async (req, res) => {
  //   const { email } = req.body;
  console.log(req.body);
  try {
    const { nombre, apellido, rol, email, password, manzana, casa, telefono } =
      req.body;

    // validar campos básicos
    if (!nombre || !apellido || !rol || !email || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // crear usuario en la BD
    const newUser = await User.create({
      nombre,
      apellido,
      rol,
      email,
      password: hashedPassword,
      manzana,
      casa,
      telefono,
    });

    res.status(201).json({
      message: "Usuario creado con éxito",
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        rol: newUser.rol,
        email: newUser.email,
        manzana: newUser.manzana,
        casa: newUser.casa,
        telefono: newUser.telefono,
      },
    });
  } catch (error) {
    console.error("Error creando usuario:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
  // return res.status(400).json({ error: "No se ha podido resetear password" });
};

export const userList = async (req, res) => {
  try {
    const listaUsuarios = await User.findAll();
    res.status(200).json(listaUsuarios);
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error);

    res
      .status(500)
      .json({
        message: "Ocurrió un error al obtener la lista de usuarios.",
        error: error.message,
      });
  }
};
