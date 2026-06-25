import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import itineraryRoutes from './routes/itinerary.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://trrip-frontend.onrender.com',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/itinerary', itineraryRoutes);

app.get('/', (req, res) => {
  res.send('Trrip API Running!');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected!');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));