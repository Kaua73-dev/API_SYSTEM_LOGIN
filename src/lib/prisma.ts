import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const dbUrl =
  process.env.DATABASE_URL?.replace("file:", "") || "./prisma/dev.db";
const adapter = new PrismaBetterSqlite3({ url: dbUrl });

export const prisma = new PrismaClient({ adapter });