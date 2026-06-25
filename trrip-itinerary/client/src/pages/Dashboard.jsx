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
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">✈️ Trrip</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Hi, {user?.name}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <UploadSection onSuccess={fetchItineraries} />

        {/* Itineraries */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">My Itineraries</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : itineraries.length === 0 ? (
          <p className="text-gray-500">No itineraries yet. Upload a travel document!</p>
        ) : (
          <div className="space-y-4">
            {itineraries.map((item) => (
              <ItineraryCard key={item._id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;