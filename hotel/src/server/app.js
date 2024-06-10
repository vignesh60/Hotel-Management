const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("./uploads"));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mydatabase'
})

const roomdb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'hotel_rooms'
})


db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database");
    throw err;
  }
  console.log("Connected to MySQL database");
});


roomdb.connect((err) => {
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




app.get("/getUser/:email", (req, res) => {
  const email = req.params.email; 
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Error fetching user details:", err);
        res.status(500).send("Error fetching user details");
      } else {
        res.json(results);
      }
    }
  );
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








/* ------------------------adding-rooms----------------------- */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const roomTitle = req.body.title.replace(/\s+/g, "-"); // Replace spaces in title with hyphens
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${roomTitle}+${file.originalname}`; // Concatenate room title and original filename
    cb(null, filename);
  },
});

const upload = multer({
    storage: storage,
}).array("images", 10);


app.post("/addRoom", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("Error uploading images:", err);
      return res.status(500).send("Error uploading images");
    }

    const room = req.body;
    const {
      title,
      location,
      description,
      price,
      rating,
      reviews,
      beds,
      sleeps,
      sq_ft,
      garden_view,
      wifi,
      washer,
      air_conditioning,
      refrigerator,
      kitchen,
      pets_allowed,
      dryer,
      security_cameras,
      bicycles,
    } = room;

    // Extract uploaded image URLs
    const images = req.files.map((file) => `/uploads/${file.filename}`);


    // Convert boolean fields to integers
    const gardenViewInt = garden_view ? 1 : 0;
    const wifiInt = wifi ? 1 : 0;
    const washerInt = washer ? 1 : 0;
    const airConditioningInt = air_conditioning ? 1 : 0;
    const refrigeratorInt = refrigerator ? 1 : 0;
    const kitchenInt = kitchen ? 1 : 0;
    const petsAllowedInt = pets_allowed ? 1 : 0;
    const dryerInt = dryer ? 1 : 0;
    const securityCamerasInt = security_cameras ? 1 : 0;
    const bicyclesInt = bicycles ? 1 : 0;

    const roomData = {
      title,
      location,
      description,
      price,
      rating,
      reviews,
      beds,
      sleeps,
      sq_ft,
      garden_view: gardenViewInt,
      wifi: wifiInt,
      washer: washerInt,
      air_conditioning: airConditioningInt,
      refrigerator: refrigeratorInt,
      kitchen: kitchenInt,
      pets_allowed: petsAllowedInt,
      dryer: dryerInt,
      security_cameras: securityCamerasInt,
      bicycles: bicyclesInt,
      images: JSON.stringify(images),
    };

    roomdb.query("INSERT INTO rooms SET ?", roomData, (err, result) => {
      if (err) {
        console.error("Error adding room to database:", err);
        res.status(500).send("Error adding room");
        return;
      }
      console.log("Room added to database with ID:", result.insertId);
      res.status(201).send("Room added successfully");
    });
  });
});












app.get("/getRoom/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  roomdb.query("SELECT * FROM rooms WHERE id = ?", roomId, (err, result) => {
    if (err) {
      console.error("Error fetching room details:", err);
      res.status(500).send("Error fetching room details");
      return;
    }
    if (result.length > 0) {
      res.json(result[0]); 
    } else {
      res.status(404).send("Room not found");
    }
  });
});





app.get("/getRooms", (req, res) => {
  roomdb.query("SELECT * FROM rooms", (err, results) => {
    if (err) {
      console.error("Error fetching room details:", err);
      res.status(500).send("Error fetching room details");
      return;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send("No rooms found");
    }
  });
});










/* -------------------------update--------------------------- */

app.put("/updateRoom/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  const {
    title,
    location,
    description,
    price,
    rating,
    reviews,
    beds,
    sleeps,
    sq_ft,
    garden_view,
    wifi,
    washer,
    air_conditioning,
    refrigerator,
    kitchen,
    pets_allowed,
    dryer,
    security_cameras,
    bicycles,
    images,
  } = req.body;

  const updateQuery = `
    UPDATE rooms 
    SET title=?, location=?, description=?, price=?, rating=?, reviews=?, beds=?, sleeps=?, sq_ft=?,
        garden_view=?, wifi=?, washer=?, air_conditioning=?, refrigerator=?, kitchen=?, pets_allowed=?,
        dryer=?, security_cameras=?, bicycles=?, images=?
    WHERE id=?
  `;
  roomdb.query(
    updateQuery,
    [
      title,
      location,
      description,
      price,
      rating,
      reviews,
      beds,
      sleeps,
      sq_ft,
      garden_view,
      wifi,
      washer,
      air_conditioning,
      refrigerator,
      kitchen,
      pets_allowed,
      dryer,
      security_cameras,
      bicycles,
      JSON.stringify(images),
      roomId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating room:", err);
        res.status(500).send("Error updating room");
        return;
      }
      console.log("Room updated successfully");
      res.send("Room updated successfully");
    }
  );
});








/* -----------------------------delete---------------------------------- */

app.delete("/deleteRoom/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  roomdb.query("DELETE FROM rooms WHERE id = ?", roomId, (err, result) => {
    if (err) {
      console.error("Error deleting room:", err);
      res.status(500).send("Error deleting room");
      return;
    }
    console.log("Room deleted successfully");
    res.send("Room deleted successfully");
  });
});










app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const fs = require('fs');

app.get("/images", (req, res) => {
  fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).send("Error reading directory");
    } else {
      const imageFiles = files.filter((file) =>
        /\.(jpg|jpeg|png|gif)$/i.test(file)
      ); // Filter image files
      res.json(imageFiles);
    }
  });
});













/* ================roombooking=============================== */


app.post("/bookRoom", (req, res) => {
  const {
    user_name,
    user_email,
    total_cost,
    check_in_date,
    check_out_date,
    room_image,
    room_name,
  } = req.body;

  const sql =
    "INSERT INTO hotel_rooms_bookings (user_name, user_email, total_cost, check_in_date, check_out_date, room_image, room_name) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    user_name,
    user_email,
    total_cost,
    check_in_date,
    check_out_date,
    room_image,
    room_name,
  ];

  roomdb.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting booking details:", err);
      res.status(500).send("Error inserting booking details");
      return;
    }
    res.status(200).send("Booking successful");
  });
});



app.get("/getBookings", (req, res) => {
  const query = "SELECT * FROM hotel_rooms_bookings";
  roomdb.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      res.status(500).send("Error fetching bookings");
      return;
    }
    res.json(results);
  });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

