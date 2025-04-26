import { Router } from "express";

import { prisma } from "../db/client";
import { authHandler } from "../middleware/auth";

const router: Router = Router();

router.get("/", authHandler, async (req, res) => {
  const userId = (req as any).user.id;
  const monitors = await prisma.monitor.findMany({ where: { userId } });
  res.json({ monitors });
});

router.post("/", authHandler, async (req, res) => {
  const { url, interval } = req.body;
  const userId = (req as any).user.id;

  const nextPingAt = new Date(Date.now() + interval * 60 * 1000);
  const monitor = await prisma.monitor.create({
    data: {
      userId,
      url,
      interval,
      nextPingAt,
    },
  });

  res.json({ monitor });
});

router.put("/:id", authHandler, async (req, res) => {
  const userId = (req as any).user.id;
  const monitorId = req.params.id;
  const { url, interval } = req.body;

  const nextPingAt = new Date(Date.now() + interval * 60 * 1000);
  const createdAt = new Date(Date.now());

  const monitor = await prisma.monitor.update({
    where: { id: monitorId, userId },
    data: { url, interval, nextPingAt, createdAt },
  });

  res.json({ monitor });
});

router.delete("/:id", authHandler, async (req, res) => {
  const userId = (req as any).user.id;
  const monitorId = req.params.id;

  await prisma.monitor.delete({ where: { id: monitorId, userId } });

  res.status(204).end();
});

export default router;
