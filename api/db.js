import dotenv from 'dotenv';
dotenv.config();

import Sequelize from 'sequelize';

console.log("DATABASE_URL en db.js:", process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export { sequelize };
