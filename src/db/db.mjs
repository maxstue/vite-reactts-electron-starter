// db.ts
import mysql from 'mysql2/promise';
import { dbConfig } from './dbConfig.mjs';

export const pool = mysql.createPool(dbConfig);

export const query = async (sql, values) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(sql, values);
    return rows;
  } finally {
    connection.release();
  }
};
