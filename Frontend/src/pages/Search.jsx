import MainLayout from "../components/ui/MainLayout";

const SearchPage = () => {
  const right = (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
      <h3 className="font-semibold mb-4">Trending</h3>
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
          #Chill
        </span>
        <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
          #NightVibes
        </span>
      </div>
    </div>
  );

  return (
    <MainLayout rightChildren={right}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Search</h2>
        <div className="mt-3">
          <input
            className="w-full bg-white/5 rounded-lg p-3"
            placeholder="Search people, posts, tags"
          />
        </div>
      </div>

      <div className="text-gray-300">No results yet — try searching above.</div>
    </MainLayout>
  );
};

export default SearchPage;
