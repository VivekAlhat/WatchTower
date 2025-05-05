import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";

import jwtRouter from "./routes/jwt";
import userRouter from "./routes/user";
import monitorRouter from "./routes/monitor";
import { errorHandler } from "./middleware/error";
import { setupBullBoard } from "./bullboard";
import { monitorQueue } from "./jobs/queues";

// load environment variables
dotenv.config();

const port = process.env.PORT! || 8000;
const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/monitor", monitorRouter);
app.use("/api/jwt", jwtRouter);
app.use(errorHandler);

setupBullBoard(app, [monitorQueue]);

app.get("/", (_, res) => {
  res.json({ message: "WatchTower server is up and running" });
});

app.listen(port, () =>
  console.log(`WatchTower server started on port ${port}`)
);
