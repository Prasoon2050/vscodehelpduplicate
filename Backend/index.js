const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
// Middleware to parse JSON bodies

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/bookingapp";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Define the schema for a booking
const bookingSchema = new mongoose.Schema({
  date: String,
  time: String,
  email: String,
  type: String,
});

// Create a model from the schema
const Booking = mongoose.model("Booking", bookingSchema);

// POST endpoint to book a slot
app.post("/bookSlot", async (req, res) => {
  const { date, time, email, type } = req.body;

  if (!date || !time || !email) {
    return res.status(400).json({ error: "date, time and email are required" });
  }

  // Check if the slot is already booked
  const existingBooking = await Booking.findOne({ date, time });
  if (existingBooking) {
    return res.status(400).json({ error: "This slot is already booked" });
  }

  // Create a new booking
  const booking = new Booking({ date, time, email, type });
  await booking.save();

  // Send a success response
  res.json({ success: true });
});

// GET endpoint to fetch booked slots
app.get("/bookedSlots", async (req, res) => {
  // Fetch the booked slots from the database
  const bookings = await Booking.find();

  // Send the date and time of all booked slots as the response
  res.json(
    bookings.map((booking) => ({
      date: booking.date,
      time: booking.time,
      type: booking.type,
    }))
  );
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rex790575@gmail.com",
    pass: "yhza fxqt qmre njnu",
  },
});

// In-memory store for OTPs
let otpStore = {};

const generateOtp = () => {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

app.post("/send-otp", (req, res) => {
  let otp = generateOtp();
  let email = req.body.email.replace("@", "-at-"); // Replace @ with -at-
  otpStore[email] = otp;

  let mailOptions = {
    from: "your-email@gmail.com",
    to: req.body.email,
    subject: "OTP for verification",
    text: "Your OTP is: " + otp,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error while sending OTP.");
    } else {
      console.log("Email sent: " + info.response);
      res.send("OTP sent!");
    }
  });
});

app.post("/verify-otp", (req, res) => {
  let otp = req.body.otp;
  console.log(otp);
  let email = req.body.email.replace("@", "-at-");
  console.log(email);
  console.log(otpStore[email]);

  if (otpStore[email] === otp) {
    delete otpStore[email];
    res.send("OTP verified!");
  } else {
    res.status(400).send("Invalid OTP.");
  }
});

const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
