import Itinerary from '../models/Itinerary.js';
import cloudinary from '../config/cloudinary.js';
import { extractAndGenerateItinerary } from '../utils/extractAndGenerate.js';
import crypto from 'crypto';
import fs from 'fs';

export const uploadAndGenerate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;

    // Upload to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
      folder: 'trrip-documents'
    });

    // Extract & Generate itinerary using Gemini
    const generatedItinerary = await extractAndGenerateItinerary(filePath, mimeType);

    // Generate share token
    const shareToken = crypto.randomBytes(16).toString('hex');

    // Save to MongoDB
    const itinerary = await Itinerary.create({
      user: req.user.id,
      title: req.file.originalname,
      documentUrl: cloudinaryResult.secure_url,
      itinerary: generatedItinerary,
      shareToken,
      isPublic: true
    });

    // Delete temp file
    fs.unlinkSync(filePath);

    res.status(201).json({
      message: 'Itinerary generated successfully',
      itinerary
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMyItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({ itineraries });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getSharedItinerary = async (req, res) => {
  try {
    const { shareToken } = req.params;

    const itinerary = await Itinerary.findOne({ shareToken, isPublic: true });

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.status(200).json({ itinerary });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.status(200).json({ message: 'Itinerary deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};