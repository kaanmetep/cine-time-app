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
  const [selectedId, setSelectedId] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState(null);
  useEffect(
    function () {
      const controller = new AbortController();
      const getData = async () => {
        try {
          setError(false);
          setLoader(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${input}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("An error occured.");
          const data = await res.json();
          if (data.Response === "False") throw new Error("film not found");
          setMovies(data.Search);
          setTotalResults(data.Search.length);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(true);
            setTotalResults(0);
          }
        } finally {
          setLoader(false);
        }
      };
      if (input.length < 1 || !input) {
        setMovies(null);
        setError(false);
        setLoader(false);
        setTotalResults(0);
        return;
      }
      getData();
      return function () {
        controller.abort();
      };
    },
    [input]
  );
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleId = (id) => {
    setSelectedId(id);
  };
  return (
    <div className="w-5/6 max-w-4xl bg-stone-200 mx-auto mt-10  rounded-lg pt-2">
      <Header>
        <SearchBox input={input} onSetInput={handleInput} />
        <TotalResults totalResults={totalResults} />
      </Header>
      <MainBox>
        <Box
          type="left"
          error={error}
          loader={loader}
          movies={movies}
          onSelectId={handleId}
        />
        <Box type="right" selectedId={selectedId} />
      </MainBox>
    </div>
  );
};

export default App;
