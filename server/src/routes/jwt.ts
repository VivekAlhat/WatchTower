import jwt from "jsonwebtoken";
import { Router } from "express";

const router: Router = Router();

router.get("/", (req, res) => {
  const payload = req.body;

  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, secret);

  res.json({ token });
});

export default router;
