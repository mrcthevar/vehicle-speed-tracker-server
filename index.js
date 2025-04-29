const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mravichandranthevar:4jOaZxAPT5gPpXaj@vehicletracker.hfd7frk.mongodb.net/?retryWrites=true&w=majority&appName=VehicleTracker');

// Data structure
const speedSchema = new mongoose.Schema({
  userId: String,
  vehicleType: String,
  speed: Number,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
});
const Speed = mongoose.model('Speed', speedSchema);

// Save speed and location
app.post('/api/gps', async (req, res) => {
  const { userId, vehicleType, speed, latitude, longitude } = req.body;
  const speedEntry = new Speed({ userId, vehicleType, speed, latitude, longitude });
  await speedEntry.save();
  res.status(201).json(speedEntry);
});

app.listen(5000, () => console.log('Server running on port 5000'));