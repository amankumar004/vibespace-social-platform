const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-black items-center justify-center relative">
        <div className="text-white text-4xl font-bold text-center px-10">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            VibeSpace
          </span>
          <p className="mt-6 text-lg text-gray-300">
            Share your vibe. Connect your world.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-black">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
