import { connection } from "../../db/redis";
import { prisma } from "../../db/prisma";
import { Worker } from "bullmq";
import axios, { AxiosError } from "axios";

const worker = new Worker(
  process.env.REDIS_QUEUE!,
  async (job) => {
    const { monitorId } = job.data;

    const monitor = await prisma.monitor.findUnique({
      where: { id: monitorId },
    });

    if (!monitor) {
      console.warn(`[Worker] Monitor ${monitorId} not found`);
      return;
    }

    let responseTime = null;
    let statusCode = null;
    let isUp = false;
    let error = null;

    const start = Date.now();
    try {
      const response = await axios.get(monitor.url, { timeout: 10000 });
      responseTime = Date.now() - start;
      statusCode = response.status;
      isUp = response.status >= 200 && response.status < 400;
    } catch (error) {
      responseTime = Date.now() - start;
      statusCode = (error as AxiosError).response?.status || null;
      isUp = false;
      error = (error as AxiosError).message || "Unknown Error";
    }

    await prisma.monitorLog.create({
      data: {
        monitorId,
        responseTime,
        statusCode,
        isUp,
        error,
      },
    });

    // update the nextPingAt based on the interval set for the monitor
    const nextPingAt = new Date(Date.now() + monitor.interval * 60 * 1000);
    await prisma.monitor.update({
      where: { id: monitorId },
      data: {
        lastPingedAt: new Date(),
        nextPingAt,
      },
    });

    console.log(
      `[Worker] Processed monitor ${monitorId} (UP: ${isUp}, Code: ${statusCode})`
    );
  },
  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`[Worker] job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed:`, err.message);
});

console.log("[Worker] Worker is running...");
