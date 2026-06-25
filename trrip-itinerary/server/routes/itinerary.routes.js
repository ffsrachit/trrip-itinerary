import express from 'express';
import multer from 'multer';
import path from 'path';
import protect from '../middleware/auth.middleware.js';
import {
  uploadAndGenerate,
  getMyItineraries,
  getSharedItinerary,
  deleteItinerary
} from '../controllers/itinerary.controller.js';

const router = express.Router();

// Multer setup - temp storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and images allowed'));
    }
  }
});

router.post('/upload', protect, upload.single('document'), uploadAndGenerate);
router.get('/my', protect, getMyItineraries);
router.get('/share/:shareToken', getSharedItinerary);
router.delete('/:id', protect, deleteItinerary);

export default router;