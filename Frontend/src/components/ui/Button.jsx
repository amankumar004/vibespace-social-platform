const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 
      hover:opacity-90 transition text-white font-semibold"
    >
      {text}
    </button>
  );
};

export default Button;
