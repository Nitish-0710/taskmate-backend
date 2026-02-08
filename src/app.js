import express from "express";
import kanbanRouter from "../routes/kanbanRouter.js";
import authRouter from "../routes/authRouter.js";
import mongoose from "mongoose";
import sessionConfig from "./config/session.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: [
      "http://localhost:5173",
      // "https://taskmate-kanban.netlify.app"
    ],
  credentials: true,
}));
app.use(sessionConfig);
app.use("/api/auth", authRouter);
app.use("/api/task", kanbanRouter);

mongoose.connect(process.env.MONGO_URI).then(() =>
  app.listen(PORT, () => {
    console.log(`Server is running at const http://localhost:${PORT}`);
  }),
).catch(err => {
  console.log('Error while connecting to DB:  ', err)
})
