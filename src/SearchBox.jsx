import { useEffect, useRef } from "react";
import { useKey } from "./useKey";
const SearchBox = ({ onSetInput, input }) => {
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  useKey("Enter", function () {
    inputEl.current.focus();
  });

  return (
    <input
      type="text"
      placeholder="Start searching..."
      className="search rounded-lg placholder:text-stone-200 px-4 py-1 text-xs w-40 sm:w-56 sm:focus:w-64 transition-all duration-300 focus:outline-none focus:ring focus:ring-red-100 focus:ring-opacity-50"
      onChange={(e) => onSetInput(e)}
      value={input}
      ref={inputEl}
    />
  );
};

export default SearchBox;
