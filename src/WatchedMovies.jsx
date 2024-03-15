import { useState } from "react";
const WatchedMovies = ({ watched, onDeleteWatched }) => {
  const [hide, setHide] = useState(false);
  return (
    <div className="bg-stone-200 w-5/6 mx-auto mt-5 rounded-lg p-4 max-w-4xl relative">
      <div className="flex sm:gap-8 border-b-2 border-stone-400 mb-3 items-center">
        <h1 className="text-sm md:text-l md:tracking-wide font-bold pb-1">
          Watched Movies
        </h1>
        <WatchedMoviesSummary watched={watched} />
      </div>
      <button
        className="bg-stone-400 rounded-full absolute px-2 text-lg text-white right-[-0.5rem] top-[-0.4rem]"
        onClick={() => setHide((curr) => !curr)}
      >
        {hide === false ? "-" : "+"}
      </button>
      {hide || (
        <div className="text-center text-xs tracking-wide">
          {/* Start adding movies to your list! */}
          <WatchedMovieList
            watched={watched}
            onDeleteWatched={onDeleteWatched}
          />
        </div>
      )}
    </div>
  );
};
const WatchedMovie = ({ filmObj, onDeleteWatched }) => {
  return (
    <li className="grid grid-cols-6 items-center bg-stone-300 p-2 rounded-lg">
      <img src={filmObj.Poster} alt="poster" className="w-10" />
      <p>{filmObj.Title}</p>
      <p>({filmObj.Year})</p>
      <p>{filmObj.userRating}★</p>
      <p>{filmObj.runtime} min</p>
      <button
        className="bg-stone-400 p-3 w-2 h-2 flex items-center justify-center rounded-full justify-self-center text-xs"
        onClick={() => onDeleteWatched(filmObj)}
      >
        X
      </button>
    </li>
  );
};
const WatchedMovieList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className="flex flex-col gap-2 ">
      {watched.map((film) => (
        <WatchedMovie
          filmObj={film}
          key={film.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};
const WatchedMoviesSummary = ({ watched }) => {
  const getTotalMinutes = () => {
    return watched.reduce((acc, movie) => movie.runtime + acc, 0);
  };
  return (
    <div className="text-xs flex gap-2 flex-col mb-3">
      <p>
        Total Movies:<span className="font-bold">{watched.length}</span>
      </p>
      <p>
        Total Minutes: <span className="font-bold">{getTotalMinutes()}min</span>
        <span>({(getTotalMinutes() / 60).toFixed(2)} hours)</span>
      </p>
    </div>
  );
};
export default WatchedMovies;
