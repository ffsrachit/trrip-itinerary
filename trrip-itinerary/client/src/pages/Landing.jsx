import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">✈️ Trrip</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 text-indigo-600 font-semibold border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <span className="bg-indigo-100 text-indigo-600 text-sm font-semibold px-4 py-1 rounded-full">
          🤖 AI-Powered Travel Planning
        </span>
        <h1 className="text-5xl font-bold text-gray-900 mt-6 mb-4 leading-tight">
          Upload Your Booking,<br />
          <span className="text-indigo-600">Get Your Itinerary Instantly</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          Just upload your flight tickets, hotel bookings, or any travel document -
          our AI will generate a detailed day-by-day travel itinerary for you.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition text-lg shadow-lg"
          >
            🚀 Try for Free
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl border border-indigo-200 hover:bg-indigo-50 transition text-lg"
          >
            Login
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '📄',
              title: 'Upload Document',
              desc: 'Upload your flight tickets, hotel bookings or any travel document in PDF or image format.'
            },
            {
              icon: '🤖',
              title: 'AI Processes It',
              desc: 'Our AI extracts all relevant travel information and understands your complete trip details.'
            },
            {
              icon: '🗺️',
              title: 'Get Itinerary',
              desc: 'Receive a detailed day-by-day travel itinerary instantly. Share it with friends and family!'
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Plan Your Trip?</h2>
        <p className="text-indigo-200 mb-8 text-lg">Join thousands of travelers using Trrip</p>
        <button
          onClick={() => navigate('/register')}
          className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition text-lg"
        >
          Get Started for Free 🚀
        </button>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-gray-400 text-sm">
        © 2026 Trrip. Built with ❤️ using MERN + AI
      </div>
    </div>
  );
};

export default Landing;