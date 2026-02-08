import express from "express";
import kanbanRouter from "../routes/kanbanRouter.js";
import authRouter from "../routes/authRouter.js";
import mongoose from "mongoose";
import sessionConfig from "./config/session.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://taskmate-kanban.netlify.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow server-to-server / curl / postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors(corsOptions));     
app.options("*", cors(corsOptions)); 

app.use(sessionConfig);        

app.use("/api/auth", authRouter);
app.use("/api/task", kanbanRouter);

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
