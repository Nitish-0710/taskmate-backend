import session from "express-session";
import dotenv from "dotenv";

dotenv.config(); 

const isProduction = process.env.NODE_ENV === "production";

const sessionConfig = session({
  name: "kanban.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy:true, 
  cookie: {
    httpOnly: true,
    secure: isProduction,                 // true only in production
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24,           // 1 day
  },
});

export default sessionConfig;
