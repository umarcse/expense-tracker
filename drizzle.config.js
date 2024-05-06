/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    driver: 'pg',
    dbCredentials: {
      connectionString: 'postgresql://neondb_owner:bXhyC8OzNkG6@ep-silent-night-a52n0dh8.us-east-2.aws.neon.tech/budget?sslmode=require',
    }
  };