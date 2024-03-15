import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import MainBox from "./MainBox";
import SearchBox from "./SearchBox";
import TotalResults from "./TotalResults";
import Box from "./Box";
import WatchedMovies from "./WatchedMovies";
const KEY = "2dddb35f";
const watchedMovies = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    userRating: 5,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    userRating: 4,
  },
];
const App = () => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState(null);
  const [watched, setWatched] = useState(watchedMovies);
  const handleAddWatched = function (movie) {
    if (watched.some((m) => m.imdbID === movie.imdbID))
      return window.alert("This movie is already in your list!");
    setWatched((watched) => [movie, ...watched]);
    setSelectedId(null);
  };
  const handleDeleteWatched = function (movie) {
    setWatched((watched) => watched.filter((m) => m.imdbID !== movie.imdbID));
  };
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleId = (id) => {
    setSelectedId(id);
  };
  useEffect(
    function () {
      const controller = new AbortController();
      const getData = async () => {
        try {
          setError(false);
          setLoader(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${input}`,
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
      setSelectedId(null);
      getData();
      return function () {
        controller.abort();
      };
    },
    [input]
  );
  return (
    <>
      <div className="w-[90%] max-w-4xl bg-stone-200 mx-auto mt-10  rounded-lg pt-2">
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
          <Box
            type="right"
            selectedId={selectedId}
            onAddWatched={handleAddWatched}
            onSelectId={setSelectedId}
          />
        </MainBox>
      </div>
      <WatchedMovies watched={watched} onDeleteWatched={handleDeleteWatched} />
    </>
  );
};

export default App;
