import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import toast from 'react-hot-toast';
import UploadSection from '../components/UploadSection';
import ItineraryCard from '../components/ItineraryCard';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItineraries = async () => {
    try {
      const { data } = await API.get('/itinerary/my');
      setItineraries(data.itineraries);
    } catch (error) {
      toast.error('Failed to fetch itineraries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/itinerary/${id}`);
      toast.success('Deleted!');
      fetchItineraries();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✈️</span>
          <h1 className="text-xl font-bold text-indigo-600">Trrip</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full">
            <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-700 font-medium text-sm">{user?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 font-medium text-sm transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-1">Welcome back, {user?.name}! 👋</h2>
          <p className="text-indigo-100">Upload a travel document to generate your AI itinerary</p>
        </div>

        {/* Upload Section */}
        <UploadSection onSuccess={fetchItineraries} />

        {/* Itineraries */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">My Itineraries</h2>
            <span className="bg-indigo-100 text-indigo-600 text-sm font-semibold px-3 py-1 rounded-full">
              {itineraries.length} trips
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : itineraries.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-5xl mb-4">🗺️</p>
              <p className="text-gray-500 font-medium">No itineraries yet!</p>
              <p className="text-gray-400 text-sm mt-1">Upload a travel document to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {itineraries.map((item) => (
                <ItineraryCard key={item._id} item={item} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;