import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import MainBox from "./MainBox";
import SearchBox from "./SearchBox";
import TotalResults from "./TotalResults";
import Box from "./Box";
const KEY = "2dddb35f";
const App = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState(null);
  useEffect(
    function () {
      (async () => {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${input}`
          );
          if (!res.ok) throw new Error("An error occured.");
          const data = await res.json();
          if (data.Response === "False") throw new Error("film not found");
          if (input.length < 2) {
            setMovies[null];
            return;
          }
          setMovies(data.Search);
          console.log(data.Search);
        } catch (err) {
          console.log(err.message);
        }
      })();
    },
    [input]
  );
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="w-5/6 max-w-4xl bg-stone-200 mx-auto mt-10  rounded-lg pt-2">
      <Header>
        <SearchBox input={input} onSetInput={handleInput} />
        <TotalResults />
      </Header>
      <MainBox>
        <Box type="left" movies={movies} />
        <Box type="right" />
      </MainBox>
    </div>
  );
};

export default App;
