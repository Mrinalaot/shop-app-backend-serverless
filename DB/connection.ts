import { Client, Pool, PoolClient } from "pg";
const dbConfig = { max: 2, idleTimeoutMillis: 5000 };

export const getDbPool = (): Pool => {
  try {
    const pool = new Pool(dbConfig);
    return pool;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDbClient = async (): Promise<PoolClient> => {
  try {
    const pool = new Pool(dbConfig);
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
