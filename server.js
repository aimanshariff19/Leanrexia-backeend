const cors = require("cors");
app.use(cors());

console.log("SERVER FILE LOADED");

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DB CONNECTION (USE SAME DB)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aiman@151023",
  database: "edubridge"
});

db.connect(err => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("EduBridge Backend Running");
});

// REGISTER
app.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, password, role], err => {
    if (err) {
      console.error("❌ Registration error:", err);
      return res.status(500).json({ message: "Registration failed" });
    }
    res.json({ message: "Registration successful" });
  });
});

// LOGIN 
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Server error"
      });
    }

    if (result.length > 0) {
      res.json({
        success: true,
        message: "Login successful",
        user: result[0]
      });
    } else {
      res.json({
        success: false,
        message: "Invalid email or password"
      });
    }
  });
});



// ENROLL
app.post("/enroll", (req, res) => {
  const { program } = req.body;

  const sql = "INSERT INTO enrollments (program_name) VALUES (?)";

  db.query(sql, [program], err => {
    if (err) return res.status(500).send("Enrollment failed");
    res.send("Enrollment successful");
  });
});

// CREATE PROGRAM
app.post("/create-program", (req, res) => {
  const { title, description, duration, ngo_name } = req.body;

  const sql =
    "INSERT INTO programs (title, description, duration, ngo_name) VALUES (?, ?, ?, ?)";

  db.query(sql, [title, description, duration, ngo_name], err => {
    if (err) return res.status(500).send("Program creation failed");
    res.send("Program created successfully");
  });
});


// ⭐⭐⭐ FEEDBACK ROUTE (ADDED)
app.post("/feedback", (req, res) => {
  const { rating } = req.body;

  if (!rating) {
    return res.status(400).json({ message: "Rating required" });
  }

  const sql = "INSERT INTO feedback (rating) VALUES (?)";

  db.query(sql, [rating], err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Feedback failed" });
    }
    res.json({ message: "Feedback submitted successfully ⭐" });
  });
});

// START SERVER
app.listen(5000, () => {
  console.log("🚀 Backend running on port 5000");
});
