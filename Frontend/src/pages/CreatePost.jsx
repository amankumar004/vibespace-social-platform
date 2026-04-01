import MainLayout from "../components/ui/MainLayout";

const CreatePostPage = () => {
  const right = null;

  return (
    <MainLayout rightChildren={right}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Create Post</h2>
      </div>

      <div className="bg-white/5 rounded-2xl p-4">
        <input
          className="w-full bg-transparent border-b border-white/10 p-2 mb-3"
          placeholder="What's happening?"
        />
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-purple-500 rounded-lg">Post</button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatePostPage;
