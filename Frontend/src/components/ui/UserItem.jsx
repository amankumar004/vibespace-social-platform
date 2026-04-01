const UserItem = ({ name }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-600"></div>
        <span className="text-sm">{name}</span>
      </div>
      <button className="text-xs text-purple-400 hover:underline">
        Follow
      </button>
    </div>
  );
};

export default UserItem;
