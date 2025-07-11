import "dotenv/config";
import cors from "cors";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDb } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // allow frontend to send cookies
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(5001, () => {
    console.log(`server is running on Port number ${PORT}`);
    connectDb();
});