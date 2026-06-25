import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';
import ReactMarkdown from 'react-markdown';

const SharedItinerary = () => {
  const { shareToken } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`/itinerary/share/${shareToken}`);
        setItinerary(data.itinerary);
      } catch (error) {
        setItinerary(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [shareToken]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!itinerary) return <div className="min-h-screen flex items-center justify-center text-red-500">Itinerary not found!</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">✈️ {itinerary.title}</h1>
        <p className="text-gray-400 text-sm mb-6">
          Generated on {new Date(itinerary.createdAt).toLocaleDateString()}
        </p>
        <div className="prose max-w-none">
          <ReactMarkdown>{itinerary.itinerary}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default SharedItinerary;