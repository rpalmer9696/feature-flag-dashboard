import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "./env";

const connectionString = env.DB_CONNECTION_STRING;

const client = postgres(connectionString);
export const db = drizzle(client);
