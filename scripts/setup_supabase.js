import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE;

if (!url || !serviceKey) {
  console.error(
    "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE environment variables before running this script.",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

async function ensureBucket(name, publicAccess = true) {
  const { data: existing } = await supabase.storage.getBucket(name);
  if (existing) {
    console.log(`Bucket ${name} exists`);
    return;
  }
  const { error } = await supabase.storage.createBucket(name, { public: publicAccess });
  if (error) throw error;
  console.log(`Bucket ${name} created`);
}

async function run() {
  try {
    await ensureBucket("noticias", true);
    await ensureBucket("galeria", true);
    await ensureBucket("logos", true);

    const sql = fs.readFileSync("./scripts/admin_setup.sql", "utf-8");
    const { error } = await supabase.rpc("sql", { sql });
    if (error) {
      console.warn(
        "Could not run SQL via RPC; run admin_setup.sql manually in Supabase SQL editor.",
      );
    } else {
      console.log("SQL executed");
    }
  } catch (err) {
    console.error(err);
  }
}

run();
