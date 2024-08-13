const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
