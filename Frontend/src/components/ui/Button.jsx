const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full py-3.5 rounded-full
        bg-gradient-to-r from-[#537fe7] via-[#ab47bc] to-[#d81b60]
        text-white font-bold text-lg
        shadow-[0_0_20px_rgba(171,71,188,0.4)]
        hover:shadow-[0_0_30px_rgba(171,71,188,0.6)]
        hover:scale-[1.01] active:scale-[0.99]
        transition-all duration-300
      "
    >
      {text}
    </button>
  );
};

export default Button;
