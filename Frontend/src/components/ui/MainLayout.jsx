import SidebarItem from "./Sidebar";
import { Home, Search, Compass, Bell, Mail, User, Plus } from "lucide-react";

const MainLayout = ({ children, rightChildren }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1a2e] to-black text-white flex p-4 gap-4">
      {/* SIDEBAR */}
      <div className="w-[260px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6">
            <span className="text-purple-400">V</span> VIBESPACE
          </h1>

          <nav className="space-y-3">
            <SidebarItem icon={<Home size={18} />} text="Home" to="/home" />
            <SidebarItem
              icon={<Search size={18} />}
              text="Search"
              to="/search"
            />
            <SidebarItem
              icon={<Compass size={18} />}
              text="Explore"
              to="/explore"
            />
            <SidebarItem
              icon={<Bell size={18} />}
              text="Notifications"
              to="/notifications"
            />
            <SidebarItem
              icon={<Mail size={18} />}
              text="Messages"
              to="/messages"
            />
            <SidebarItem
              icon={<User size={18} />}
              text="Profile"
              to="/profile"
            />
            <SidebarItem icon={<Plus size={18} />} text="Create" to="/create" />
          </nav>
        </div>

        <div className="text-gray-400 text-sm mt-6">⚙ Settings</div>
      </div>

      {/* FEED */}
      <div className="flex-1 max-w-2xl mx-auto">{children}</div>

      {/* RIGHT PANEL */}
      <div className="w-[280px] hidden lg:block">
        {rightChildren ? rightChildren : <div />}
      </div>
    </div>
  );
};

export default MainLayout;
