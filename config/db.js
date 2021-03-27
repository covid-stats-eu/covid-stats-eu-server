// Database connection and configuration
import { createConnection } from 'mysql2/promise';
import credentials from './credentials.js';

const query = async (sql, params) => {
    const connection = await createConnection(credentials.db);
    const [results, ] = await connection.execute(sql, params);

    return results;
}

export default query