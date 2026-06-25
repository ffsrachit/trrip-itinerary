import express from 'express';
import multer from 'multer';
import protect from '../middleware/auth.middleware.js';
import {
  uploadAndGenerate,
  getMyItineraries,
  getSharedItinerary,
  deleteItinerary
} from '../controllers/itinerary.controller.js';

const router = express.Router();

// Memory storage - no disk needed
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
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