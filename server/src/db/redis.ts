import dotenv from "dotenv";
import IORedis from "ioredis";

dotenv.config();

export const connection = new IORedis({
  host: process.env.REDIS_HOST!,
  username: process.env.REDIS_USER!,
  password: process.env.REDIS_PASSWORD!,
  port: Number(process.env.REDIS_PORT!),
  maxRetriesPerRequest: null,
});
