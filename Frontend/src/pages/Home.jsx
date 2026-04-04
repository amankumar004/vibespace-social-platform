import MainLayout from "../components/ui/MainLayout";
import PostCard from "../components/ui/Postcard";
import UserItem from "../components/ui/UserItem";
import Tag from "../components/ui/Tag";
import { useState } from "react";
import { getFeedPosts } from "../services/feedService";
import { useEffect } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await getFeedPosts({ page: 1, limit: 10 });
      setPosts(data);
    } catch (error) {
      console.error("Error fetching feed posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const rightPanel = (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
      <h3 className="font-semibold mb-4">People to Follow</h3>

      <UserItem name="Leo C." />
      <UserItem name="Mia L." />

      <h3 className="font-semibold mt-6 mb-3">Trending Moods</h3>

      <div className="flex flex-wrap gap-2">
        <Tag text="#Chill" />
        <Tag text="#NightVibes" />
      </div>
    </div>
  );

  return (
    <MainLayout rightChildren={rightPanel}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Feed</h2>
      </div>

      {/* POSTS */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-400">No posts found</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
