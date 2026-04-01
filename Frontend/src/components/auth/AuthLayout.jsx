const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f0c29] via-[#1a1a2e] to-black">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
        {/* Glow Background */}
        <div className="absolute w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-3xl top-20 left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-3xl bottom-20 right-20"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              VibeSpace
            </span>
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed">
            Catch the vibe. <br />
            Share your world. <br />
            Connect with people.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
