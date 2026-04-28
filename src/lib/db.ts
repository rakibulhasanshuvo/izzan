import { PrismaClient } from "@/generated/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const dbPath = `file:${path.resolve(process.cwd(), "prisma", "dev.db")}`;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: dbPath }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
