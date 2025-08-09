import {config} from 'dotenv';
config();

// export const MONGODB_URI = process.env.MONGODB_URI;
export const PG_DB = process.env.PG_DB;
export const PG_USER = process.env.PG_USER;
export const PG_PASS = process.env.PG_PASS;
export const PG_HOST = process.env.PG_HOST;
export const PG_PORT = process.env.PG_PORT;
export const JWT_SECRET = process.env.JWT_SECRET;