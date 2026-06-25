import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  documentUrl: {
    type: String
  },
  extractedData: {
    type: String
  },
  itinerary: {
    type: String,
    required: true
  },
  shareToken: {
    type: String,
    unique: true
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Itinerary', itinerarySchema);