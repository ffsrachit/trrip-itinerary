import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

const ItineraryCard = ({ item, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCopyLink = () => {
    const link = `${window.location.origin}/share/${item.shareToken}`;
    navigator.clipboard.writeText(link);
    toast.success('Share link copied!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-800">✈️ {item.title}</h3>
          <p className="text-gray-400 text-sm mt-1">
            {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopyLink}
            className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg text-sm hover:bg-indigo-200 transition"
          >
            🔗 Share
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="bg-red-100 text-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-200 transition"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-indigo-600 text-sm font-semibold hover:underline"
      >
        {expanded ? '▲ Hide Itinerary' : '▼ View Itinerary'}
      </button>

      {expanded && (
        <div className="mt-4 prose max-w-none border-t pt-4">
          <ReactMarkdown>{item.itinerary}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default ItineraryCard;