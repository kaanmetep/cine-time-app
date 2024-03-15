const KEY = "2dddb35f";
import { useEffect, useState } from "react";
import Error from "./Error";
import Loader from "./Loader";
import StarRating from "./StarRating";
const Box = ({
  type,
  movies,
  error,
  loader,
  onSelectId,
  selectedId,
  onAddWatched,
}) => {
  if (type === "left")
    return (
      <div className="flex-1 border-r-2 border-stone-500 p-4 overflow-auto">
        {error === true ? (
          <Error />
        ) : loader === true ? (
          <Loader />
        ) : (
          <MovieList movies={movies} onSelectId={onSelectId} />
        )}
      </div>
    );

  return (
    <div className="flex-1 overflow-auto">
      <MovieDetails selectedId={selectedId} onAddWatched={onAddWatched} />
    </div>
  );
};

const Movie = ({ movieObj, onSelectId }) => {
  return (
    <li
      className="bg-stone-300 rounded-lg p-2 cursor-pointer flex gap-2 hover:bg-red-50 transition-all duration-150"
      onClick={() => onSelectId(movieObj.imdbID)}
    >
      <img src={movieObj.Poster} alt="movie-poster" className="h-10" />
      <div className="">
        <p className="text-sm md:text-lg font-medium md:font-normal">
          {movieObj.Title}
        </p>
        <p className="text-[10px]">{movieObj.Year}</p>
      </div>
    </li>
  );
};

const MovieList = ({ movies, onSelectId }) => {
  return (
    <ul className="flex flex-col gap-4 ">
      {movies?.map((movie) => (
        <Movie movieObj={movie} key={movie.imdbID} onSelectId={onSelectId} />
      ))}
    </ul>
  );
};

const MovieDetails = ({ selectedId, onAddWatched }) => {
  const [loader, setLoader] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  useEffect(
    function () {
      setUserRating(0);
      (async () => {
        try {
          setLoader(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          if (!res.ok) throw new Error("data could not fetched");
          const data = await res.json();
          if (data.Response === "False") throw new Error("incorrect id");
          setSelectedMovie(data);
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoader(false);
        }
      })();
    },
    [selectedId]
  );
  return (
    selectedId &&
    (loader === true ? (
      <Loader />
    ) : (
      <div>
        <div className="flex gap-2 mb-6 bg-stone-300 pb-2 pl-2 items-center">
          <img
            src={selectedMovie.Poster}
            alt="selectedMoviePoster"
            className="w-14 sm:w-20 h-full "
          />
          <div className="flex flex-col sm:gap-1 sm:text-xs grow-0 text-[8px]">
            <p className="font-bold mb-1 text-sm sm:text-lg">
              {selectedMovie.Title}
            </p>
            <p>{selectedMovie.Genre}</p>
            <p>{selectedMovie.Released}</p>
            <p>{selectedMovie.Language}</p>
          </div>
        </div>
        <div className="flex bg-stone-300 p-2 rounded-lg gap-2 m-1 mb-4 items-center justify-center">
          <StarRating onSetRating={setUserRating} />
        </div>
        {userRating !== 0 && (
          <button
            className="text-xs bg-stone-100 px-8 py-2 rounded-full mx-auto block mb-3 hover:bg-stone-400 transition-all delay-50"
            onClick={() => {
              const newMovie = {
                imdbID: selectedMovie.imdbID,
                Title: selectedMovie.Title,
                Year: selectedMovie.Year,
                Poster: selectedMovie.Poster,
                runtime: Number(selectedMovie.Runtime.split(" ")[0]) || 0,
                userRating: Number(userRating),
              };
              onAddWatched(newMovie);
            }}
          >
            + Add to list
          </button>
        )}

        <p className="text-sm p-2">{selectedMovie.Plot}</p>
      </div>
    ))
  );
};

export default Box;
