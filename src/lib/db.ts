import { lookup } from "node:dns/promises";
import postgres from "postgres";

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL ?? import.meta.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL nao configurada");
  }
  return url.replace("&channel_binding=require", "").replace("channel_binding=require&", "");
}

let clientPromise: Promise<ReturnType<typeof postgres>> | null = null;

async function createClient() {
  const parsed = new URL(getDatabaseUrl());
  const { address } = await lookup(parsed.hostname, { family: 4 });

  return postgres({
    host: address,
    port: Number(parsed.port || 5432),
    database: parsed.pathname.replace(/^\//, ""),
    username: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    ssl: { rejectUnauthorized: false, servername: parsed.hostname },
    max: 1,
    idle_timeout: 20,
    connect_timeout: 15,
  });
}

export async function getSql() {
  if (!clientPromise) {
    clientPromise = createClient();
  }
  return clientPromise;
}
