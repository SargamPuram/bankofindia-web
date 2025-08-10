
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

// ✅ Allow requests from frontend running at localhost:8080
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// --- MongoDB Atlas Connection ---
mongoose
  .connect('mongodb+srv://o71510307:rWwEfsiaZYhVfFHM@cluster0.xksa5g3.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Atlas Connected'))
  .catch((err) => console.error('❌ MongoDB Atlas Connection Error:', err));

// --- Schema ---
const loginSchema = new mongoose.Schema({
  username: String,
  location: {
    latitude: Number,
    longitude: Number,
    accuracy: Number,
    timestamp: Number,
  },
  keystrokeData: [
    {
      key: String,
      type: String,
      time: Number,
    },
  ],
  typingSpeed: String,
  timestamp: String,
});

const LoginAttempt = mongoose.model('LoginAttempt', loginSchema);

// --- Routes ---

app.post('/api/store-login-data', async (req, res) => {
  try {
    let { username, location, typingSpeed, timestamp } = req.body;

    // If keystrokeData is sent as a string, parse it
    // if (typeof keystrokeData === 'string') {
    //   try {
    //     keystrokeData = JSON.parse(keystrokeData);
    //   } catch (e) {
    //     return res.status(400).json({ message: 'Invalid keystrokeData format' });
    //   }
    // }

    const attempt = new LoginAttempt({
      username,
      location,
      keystrokeData,
      typingSpeed,
      timestamp,
    });

    await attempt.save();

    console.log('📥 New login attempt saved:', attempt);
    res.status(200).json({ message: 'Data stored successfully', attempt });
  } catch (error) {
    console.error('❌ Error saving data:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
