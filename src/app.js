const express = require("express");
const connectDB = require("./config/database"); // Import DB connection
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connect to MongoDB
connectDB().then(() => {
  app.use("/", userRouter);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => console.error("DB Connection Failed:", err));
