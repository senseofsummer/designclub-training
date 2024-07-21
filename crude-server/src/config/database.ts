import mysql from 'mysql2';
import { promisify } from 'util';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool(config);

const query = promisify(pool.query).bind(pool);

export default query;
