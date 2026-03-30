const Input = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
      focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none 
      text-white placeholder-gray-400 transition"
    />
  );
};

export default Input;
