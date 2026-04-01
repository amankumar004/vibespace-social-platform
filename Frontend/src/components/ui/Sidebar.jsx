const SidebarItem = ({ icon, text, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition
      ${active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default SidebarItem;
