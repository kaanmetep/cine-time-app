import { useEffect, useState } from "react";
const KEY = "2dddb35f";
export function useMovies(input) {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [movies, setMovies] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
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
      setSelectedId(null); // to delete current selected movie when start searching for another one.
      getData();
      return function () {
        controller.abort();
      };
    },
    [input]
  );
  return { error, loader, totalResults, movies, selectedId, setSelectedId };
}
