import express from "express";
import kanbanRouter from "../routes/kanbanRouter.js";
import authRouter from "../routes/authRouter.js";
import mongoose from "mongoose";
import sessionConfig from "./config/session.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

/* -------------------------------------------------- */
/* 🔑 TRUST PROXY (RENDER)                             */
/* -------------------------------------------------- */
app.set("trust proxy", 1);

/* -------------------------------------------------- */
/* 🌍 CORS — MUST BE FIRST                             */
/* -------------------------------------------------- */
const corsOptions = {
  origin: "https://taskmate-kanban.netlify.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// preflight MUST return immediately
app.options("*", cors(corsOptions));

/* -------------------------------------------------- */
/* BODY PARSERS                                       */
/* -------------------------------------------------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* -------------------------------------------------- */
/* SESSION (AFTER CORS)                               */
/* -------------------------------------------------- */
app.use(sessionConfig);

/* -------------------------------------------------- */
/* ROUTES                                             */
/* -------------------------------------------------- */
app.use("/api/auth", authRouter);
app.use("/api/task", kanbanRouter);

/* -------------------------------------------------- */
/* DB + SERVER                                        */
/* -------------------------------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to DB:", err);
  });
