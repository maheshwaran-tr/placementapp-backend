import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import driverRoutes from "./routes/driveRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/students", studentRoutes);
app.use("/staff", staffRoutes);
app.use("/admin", adminRoutes);
app.use("/company", companyRoutes);
app.use("/drive", driverRoutes);
app.use("/files", fileRoutes);


// Home route
app.get("/", (req, res) => {
  res.send("Hello, Mahesh.js!");
});

// Handle unmatched routes (404)
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});


// Middleware to handle errors
app.use(errorHandler);

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
