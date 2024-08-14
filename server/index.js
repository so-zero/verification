const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
