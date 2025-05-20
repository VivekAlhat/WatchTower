import { prisma } from "../db/prisma";
import { monitorQueue } from "../jobs/queues/index";

const POLL_INTERVAL = Number(process.env?.SCHEDULER_POLL_INTERVAL || 60) * 1000;

/**
 * This function checks monitors that are due for pinging.
 * It then adds all due monitors into the Redis queue for processing.
 * It is a scheduler function that runs every 60 seconds.
 */
async function enqueueDueMonitors() {
  const dueMonitors = await prisma.monitor.findMany({
    where: {
      nextPingAt: {
        lte: new Date(),
      },
    },
  });

  for (const monitor of dueMonitors) {
    await monitorQueue.add(process.env.REDIS_QUEUE!, { monitorId: monitor.id });
  }

  console.log(
    `[Scheduler] enqueued ${
      dueMonitors.length
    } monitors at ${new Date().toISOString()}`
  );
}

setInterval(enqueueDueMonitors, POLL_INTERVAL);

console.log("[Scheduler] Running scheduler for due monitors...");
