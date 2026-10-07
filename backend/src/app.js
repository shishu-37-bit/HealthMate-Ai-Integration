const express = require('express');
require('dotenv').config();

const cors = require('cors')
const cookieParser = require('cookie-parser');

const { connectDB } = require("./config/database")
const { profileRouter } = require('./router/profile');
const { authRouter } = require('./router/auth');
const { reportRouter } = require('./router/report');
const { vitalsRouter } = require('./router/vitial');

const app = express();

// Express file 
const corsOptions = {
  origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL, "http://localhost:3000"] : ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());


app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/report', reportRouter);
app.use('/vitals', vitalsRouter);

app.get('/', (req, res) => {
  res.json({
    status: "online",
    message: "HealthMate AI API Server is operational 🚀",
    version: "1.0.0",
    developer: "Shivam Shukla"
  });
});

app.get('/health', (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

connectDB().catch((err) => {
  console.warn("⚠️ MongoDB connection warning (ensure MONGO_URL in .env is configured):", err.message);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 HealthMate API Server is running on port ${PORT}`);  
});      