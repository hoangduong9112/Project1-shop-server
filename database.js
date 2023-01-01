import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const clientPG = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});
