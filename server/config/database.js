// Imp pg pkg for db connection
import pg from 'pg'
// Imp local dotenv cfg
import './dotenv.js'

// Init cfg obj for db connection using env vars
const cfg = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
        rejectUnauthorized: false
    }
}

// Init and exp db connection pool
export const pool = new pg.Pool(cfg)