import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

// Pool de connexions 
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_LOCAL,
})

// db combine le pool + le schema : c'est CET objet qu'on va importer
// partout dans le projet pour faire des requêtes (db.select(), db.query...)
export const db = drizzle(pool, { schema })