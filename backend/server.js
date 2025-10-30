require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce_cart";
connectDB(MONGO_URI);

// routes
app.use("/api/cart", require("./routes/cart"));

app.get("/", (req, res) => res.send("E-Commerce Cart Backend Running..."));

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
