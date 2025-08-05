// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not provided");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  dbName: "hone",
  useNewUrlParser: true,
  useUnifiedTopology: true // recommended for newer versions
})
.then(() => {
  console.log("✅ Connected to MongoDB");

  // Start the server after DB connection
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});

// Define a simple user model
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String
}));

// ➕ Root route for basic health check
app.get("/", (req, res) => {
  res.send("✅ API is working and connected to MongoDB");
});

// 👥 Sample route to fetch users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
