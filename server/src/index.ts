import dotenv from "dotenv";
import express from "express";

import userRouter from "./routes/user";
import monitorRouter from "./routes/monitor";
import { errorHandler } from "./middleware/error";

// load environment variables
dotenv.config();

const port = process.env.PORT! || 8000;
const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/monitors", monitorRouter);
app.use(errorHandler);

app.get("/", (_, res) => {
  res.json({ message: "WatchTower server is up and running" });
});

app.listen(port, () =>
  console.log(`WatchTower server started on port ${port}`)
);
