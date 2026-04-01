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

import SidebarItem from "../components/ui/Sidebar";
import PostCard from "../components/ui/Postcard";
import UserItem from "../components/ui/UserItem";
import Tag from "../components/ui/Tag";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1a2e] to-black text-white flex p-4 gap-4">
      {/* SIDEBAR */}
      <div className="w-[260px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6">
            <span className="text-purple-400">V</span> VIBESPACE
          </h1>

          <nav className="space-y-3">
            <SidebarItem icon={<Home size={18} />} text="Home" active />
            <SidebarItem icon={<Search size={18} />} text="Search" />
            <SidebarItem icon={<Compass size={18} />} text="Explore" />
            <SidebarItem icon={<Bell size={18} />} text="Notifications" />
            <SidebarItem icon={<Mail size={18} />} text="Messages" />
            <SidebarItem icon={<User size={18} />} text="Profile" />
            <SidebarItem icon={<Plus size={18} />} text="Create" />
          </nav>
        </div>

        <div className="text-gray-400 text-sm mt-6">⚙ Settings</div>
      </div>

      {/* FEED */}
      <div className="flex-1 max-w-2xl mx-auto">
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
      </div>

      {/* RIGHT PANEL */}
      <div className="w-[280px] hidden lg:block">
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
      </div>
    </div>
  );
};

export default HomePage;
