import dotenv from 'dotenv';
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

import express from 'express';
import { sequelize } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

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
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public';
    `);
    res.json(results);
  } catch (error) {
    console.error('❌ Error al obtener las tablas:', error);
    res.status(500).json({ error: 'Error al obtener las tablas' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
