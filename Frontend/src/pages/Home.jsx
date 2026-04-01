import {
  Heart,
  MessageCircle,
  Share2,
  Home,
  Search,
  Compass,
  Bell,
  Mail,
  User,
  Plus,
} from "lucide-react";
import MainLayout from "../components/ui/MainLayout";
import PostCard from "../components/ui/Postcard";
import UserItem from "../components/ui/UserItem";
import Tag from "../components/ui/Tag";

const HomePage = () => {
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
        <h2 className="text-2xl font-semibold">Feeds</h2>
        <div className="flex gap-6 mt-3 text-gray-400">
          <span className="text-white border-b-2 border-purple-500 pb-1 cursor-pointer">
            All
          </span>
          <span className="hover:text-white cursor-pointer">Following</span>
        </div>
      </div>

      {/* POSTS */}
      <div className="space-y-6">
        <PostCard />
        <PostCard />
      </div>
    </MainLayout>
  );
};

export default HomePage;
