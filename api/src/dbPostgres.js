import { Sequelize } from 'sequelize';
import { PG_DB, PG_USER, PG_PASS, PG_HOST, PG_PORT } from './config.js';

export const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASS, {
  host: PG_HOST,
  port: PG_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // ⚠️ importante para Render
    },
  },
  define: {
    freezeTableName: true,
  },
  logging: false,
});
