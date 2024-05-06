import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";
const sql = neon('postgresql://neondb_owner:bXhyC8OzNkG6@ep-silent-night-a52n0dh8.us-east-2.aws.neon.tech/budget?sslmode=require');
export const db = drizzle(sql, {schema});