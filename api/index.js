import dotenv from 'dotenv';
import express from 'express';
import { sequelize } from './db.js';
import router from './src/routes/apiRoutes.js';
import bodyParser from "body-parser";
import cors from "cors";

if (process.env.NODE_ENV !== 'production') {
  const result = dotenv.config();
  if (result.error) {
    console.warn("No se encontró archivo .env, pero está bien si estás en producción.");
  }
}

// // Carga inmediata y forzada
// const result = dotenv.config();
// if (result.error) {
//   console.error("Error cargando .env:", result.error);
//   process.exit(1);
// }

console.log("DATABASE_URL:", process.env.DATABASE_URL);


const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://sog.verificacionmendoza.com.ar",
    "http://sog.verificacionmendoza.com.ar",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // Incluye Authorization aquí
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send('✅ Conexión exitosa a PostgreSQL con Sequelize');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    res.status(500).send('Error al conectar a la base de datos');
  }
});
app.get('/tablas', async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT *
      FROM usuarios;
    `);
    res.json(results);
  } catch (error) {
    console.error('❌ Error al obtener las tablas:', error);
    res.status(500).json({ error: 'Error al obtener las tablas' });
  }
});
// Montamos todas las rutas bajo /api
app.use('/api', cors(corsOptions), router );
// app.use("/api", cors(corsOptions), verifyToken, publicRouter);


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
