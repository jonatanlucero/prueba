import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sequelize } from "../dbPostgres.js";
import { QueryTypes } from "sequelize";
import { JWT_SECRET } from "../config.js";
import { User } from "../models/User.js";
// import { sendMailResetPass } from "../emails/sendNodeMailer.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // Consulta SQL para obtener el usuario con el email y el hash de la contraseña
  //   const queryUser = `SELECT user, user_email FROM login`;

  try {
    // const usuarios = await User.findAll(); // trae todos
    const usuario = await User.findOne({
      where: { email: email },
    });
    console.log(usuario);
    if (!usuario) {
      return res.status(404).json({
        message: "No se encontró ningún usuario con ese email",
      });
    }
return res.status(200).json(usuario);

    // return res.json(usuario);
    //     const [results] = await sequelize.query(`SELECT * FROM login;`);
    //     console.log(results)
    // res.json(results);
    // const results = await sequelize.query(queryUser, {
    //   type: QueryTypes.SELECT,
    //   replacements: { email },
    // });

    // if (results.length === 0) {
    //   return res
    //     .status(401)
    //     .json({ error: "Usuario o contraseña incorrectos" });
    // }

    // const user = results[0];
    // console.log(user);
    // // Verificar si la contraseña es correcta
    // const validPassword = await bcrypt.compare(password, user.password);
    // console.log(validPassword);
    // if (!validPassword) {
    //   return res
    //     .status(401)
    //     .json({ error: "Usuario o contraseña incorrectos" });
    // }

    // // Generar el token JWT
    // const token = jwt.sign(
    //   {
    //     id: user.user_email,
    //     role: user.role,
    //     user: user.user,
    //     idconcesionaria: user.idconcesionaria,
    //   },
    //   JWT_SECRET,
    //   {
    //     expiresIn: "1h",
    //   }
    // );

    // const updateClockUser = `UPDATE login set lastentry=now() WHERE user_email = :email limit 1`;
    // const resultsUpdate = await sequelize.query(updateClockUser, {
    //   type: QueryTypes.UPDATE,
    //   replacements: { email },
    // });
    // console.log("el token es: ", token);
    // res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error en el login", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // const user = users.find(u => u.email === email);
  // if (!user) {
  //   return res.status(404).json({ message: "Email no encontrado" });
  // }

  try {
    const queryUser =
      "SELECT user_email, user FROM login WHERE user_email = :email";
    const results = await sequelize.query(queryUser, {
      type: QueryTypes.SELECT,
      replacements: { email },
    });
    if (results.length === 0) {
      return res.status(404).json({ message: "Email no encontrado" });
    }
    const user = results[0];
    const token = jwt.sign(
      { id: user.user_email, user: user.user },
      JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const resetLink = `https://sog.verificacionmendoza.com.ar/reset-password/${token}`;
    // console.log(token);
    const dataMail = {
      email,
      resetLink,
      nombre: user.user,
    };
    sendMailResetPass(dataMail);
    return res.json({ message: "Se envió el link de recuperación al correo." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "No se ha podido resetear password" });
  }
};
export const resetPassword = async (req, res) => {
  // console.log(req.body)
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    const userEmail = decoded.id;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    try {
      const queryUpdateUserPass = `UPDATE login SET password=:hash WHERE login.user_email=:userEmail limit 1`;
      const results = await sequelize.query(queryUpdateUserPass, {
        type: QueryTypes.UPDATE,
        replacements: {
          hash,
          userEmail,
        },
      });

      res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
      return res.status(400).json({ error: "Token inválido o expirado" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Token inválido o expirado" });
  }
};
export const validateResetToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token no enviado." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res
      .status(200)
      .json({ message: "Token válido.", userId: decoded.id });
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};
