import { Queue } from "bullmq";
import { connection } from "../../db/redis";

export const monitorQueue = new Queue(process.env.REDIS_QUEUE!, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
