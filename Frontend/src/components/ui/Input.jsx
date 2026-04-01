const Input = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        relative w-full px-5 py-3 rounded-xl
        bg-[#1a1a1a]/80 border border-white/5
        text-white placeholder-gray-600
        focus:outline-none focus:border-purple-500/50
        transition-all duration-300
      "
    />
  );
};

export default Input;
