const SearchBox = ({ onSetInput, input }) => {
  return (
    <input
      type="text"
      placeholder="Start searching..."
      className="rounded-lg placholder:text-stone-200 px-4 py-1 text-xs w-40 sm:w-56 sm:focus:w-64 transition-all duration-300 focus:outline-none focus:ring focus:ring-red-100 focus:ring-opacity-50"
      onChange={(e) => onSetInput(e)}
      value={input}
    />
  );
};

export default SearchBox;
