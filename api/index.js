import dotenv from 'dotenv';

// Carga inmediata y forzada
const result = dotenv.config();
if (result.error) {
  console.error("Error cargando .env:", result.error);
  process.exit(1);
}

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

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
