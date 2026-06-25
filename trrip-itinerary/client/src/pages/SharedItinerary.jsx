import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import ReactMarkdown from 'react-markdown';

const SharedItinerary = () => {
  const { shareToken } = useParams();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const { data } = await API.get(`/itinerary/share/${shareToken}`);
        setItinerary(data.itinerary);
      } catch (error) {
        setItinerary(null);
      } finally {
        setLoading(false);
      }
    };
    fetchItinerary();
  }, [shareToken]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Loading your itinerary...</p>
      </div>
    </div>
  );

  if (!itinerary) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Itinerary Not Found</h2>
        <p className="text-gray-500 mb-6">This link may be invalid or expired</p>
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✈️</span>
          <h1 className="text-xl font-bold text-indigo-600">Trrip</h1>
        </div>
        <button
          onClick={() => navigate('/register')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
        >
          Create Your Own ✨
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-blue-500 rounded-2xl p-6 mb-6 text-white">
          <p className="text-indigo-200 text-sm mb-1">✈️ Shared Itinerary</p>
          <h1 className="text-2xl font-bold mb-2">{itinerary.title}</h1>
          <p className="text-indigo-200 text-sm">
            Generated on {new Date(itinerary.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </p>
        </div>

        {/* Itinerary Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="prose max-w-none prose-headings:text-indigo-600 prose-h2:text-2xl prose-h3:text-lg prose-li:text-gray-600">
            <ReactMarkdown>{itinerary.itinerary}</ReactMarkdown>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 bg-indigo-50 rounded-2xl p-6 text-center border border-indigo-100">
          <p className="text-gray-700 font-semibold mb-2">Want to create your own itinerary?</p>
          <p className="text-gray-500 text-sm mb-4">Upload your travel documents and get an AI-powered itinerary instantly!</p>
          <button
            onClick={() => navigate('/register')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            🚀 Get Started for Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedItinerary;