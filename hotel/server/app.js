const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mydatabase'
})

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database");
    throw err;
  }
  console.log("Connected to MySQL database");
});



app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Hash password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password");
      res.status(500).send("Internal Server Error");
      return;
    }

    // Check if email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) {
        console.error("Error checking for existing user");
        res.status(500).send("Internal Server Error");
        return;
      }

      if (results.length > 0) {
        res.status(400).send("Email already registered");
      } else {
        // Insert new user into database
        db.query(
          "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
          [name, email, hashedPassword],
          (err, result) => {
            if (err) {
              console.error("Error inserting new user");
              res.status(500).send("Internal Server Error");
              return;
            }
            res.status(201).send("User registered successfully");
          }
        );
      }
    });
  });
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if email exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error checking for user");
      res.status(500).send("Internal Server Error");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      // Compare hashed password
      bcrypt.compare(
        password,
        results[0].password_hash,
        (err, passwordMatch) => {
          if (err) {
            console.error("Error comparing passwords");
            res.status(500).send("Internal Server Error");
            return;
          }

          if (!passwordMatch) {
            res.status(401).send("Invalid password");
          } else {
            res.status(200).send("Login successful");
          }
        }
      );
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

