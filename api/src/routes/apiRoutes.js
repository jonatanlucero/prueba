import { Router } from 'express';
import { sequelize } from '../../db.js';
import { login } from "../controllers/loginController.js";
import { userAdd, userList } from '../controllers/userController.js';

const router = Router();
router.post("/login", login )
router.post("/usuarios", userAdd)
router.get("/usuarios", userList);

// // Ruta para obtener usuarios
// router.get('/usuarios', async (req, res) => {
//   try {
//     const [results] = await sequelize.query(`SELECT * FROM usuarios;`);
//     res.json(results);
//   } catch (error) {
//     console.error('❌ Error al obtener usuarios:', error);
//     res.status(500).json({ error: 'Error al obtener usuarios' });
//   }
// });

export default router;
