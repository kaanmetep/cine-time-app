import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import MainBox from "./MainBox";
import SearchBox from "./SearchBox";
import TotalResults from "./TotalResults";
import Box from "./Box";
const KEY = "2dddb35f";
const App = () => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState(null);
  useEffect(
    function () {
      (async () => {
        try {
          if (input.length < 1 || !input) {
            setMovies(null);
            setError(false);
            setLoader(false);
            setTotalResults(0);
            return;
          }
          setError(false);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${input}`
          );
          setLoader(true);
          if (!res.ok) throw new Error("An error occured.");
          const data = await res.json();
          if (data.Response === "False") throw new Error("film not found");
          setMovies(data.Search);
          setLoader(false);
          setTotalResults(data.Search.length);
          console.log(data.Search);
        } catch (err) {
          setError(true);
          setTotalResults(0);
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
        <TotalResults totalResults={totalResults} />
      </Header>
      <MainBox>
        <Box type="left" error={error} loader={loader} movies={movies} />
        <Box type="right" />
      </MainBox>
    </div>
  );
};

export default App;
