import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon, text, to = "#" }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-xl transition ${
          isActive
            ? "bg-white/10 text-white"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
};

export default SidebarItem;
