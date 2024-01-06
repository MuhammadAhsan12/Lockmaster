import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDataBase from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import phoneRoutes from "./routes/phoneRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDataBase();
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/phones", phoneRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running!");
  });
}

app.use(notFound);
app.use(errorHandler);

const Port = process.env.PORT || 5000;

app.listen(
  Port,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${Port}`)
);
