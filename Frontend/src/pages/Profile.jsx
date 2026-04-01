import MainLayout from "../components/ui/MainLayout";

const ProfilePage = () => {
  const right = null; // empty right panel per spec

  return (
    <MainLayout rightChildren={right}>
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-600" />
          <div>
            <h2 className="text-2xl font-semibold">Avery K.</h2>
            <p className="text-gray-400">Photographer • NYC</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-300">Bio: Capturing moments and good vibes.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl h-40" />
          <div className="bg-white/5 rounded-xl h-40" />
          <div className="bg-white/5 rounded-xl h-40" />
          <div className="bg-white/5 rounded-xl h-40" />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
