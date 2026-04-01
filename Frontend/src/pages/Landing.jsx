import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1a2e] to-black flex items-center justify-center text-white p-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-purple-400">V</span> VIBESPACE
        </h1>
        <p className="text-gray-300 mb-6">
          A minimal social space for sharing moments and good vibes.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/home" className="px-6 py-3 bg-purple-500 rounded-lg">
            Get Started
          </Link>
          <Link
            to="/info"
            className="px-6 py-3 border border-white/10 rounded-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
