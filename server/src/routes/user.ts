import { Router } from "express";

import { prisma } from "../db/prisma";
import { authHandler } from "../middleware/auth";

const router: Router = Router();

router.get("/:id", authHandler, async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findFirst({ where: { id: userId } });
  res.json(user);
});

router.post("/", async (req, res) => {
  const { email } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    res.json({ user: existingUser });
  } else {
    const user = await prisma.user.create({ data: { email } });
    res.json(user);
  }
});

router.delete("/:id", authHandler, async (req, res) => {
  const userId = req.params.id;
  await prisma.user.deleteMany({ where: { id: userId } });
  res.status(204).end();
});

export default router;
