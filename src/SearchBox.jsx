import { useEffect, useRef } from "react";

const SearchBox = ({ onSetInput, input }) => {
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
    const callback = (e) => {
      if (e.code === "Enter") {
        inputEl.current.focus();
      }
    };

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, []);

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
