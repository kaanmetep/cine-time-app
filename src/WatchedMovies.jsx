import { useState } from "react";
const WatchedMovies = ({ watched }) => {
  const [hide, setHide] = useState(false);
  return (
    <div className="bg-stone-200 w-5/6 mx-auto mt-5 rounded-lg p-4 max-w-4xl relative">
      <h1 className="text-sm md:text-l md:tracking-wide font-bold border-b-2 border-stone-400 pb-1 mb-3">
        Watched Movies
      </h1>
      <button
        className="bg-stone-400 rounded-full absolute px-2 text-lg text-white right-[-0.5rem] top-[-0.4rem]"
        onClick={() => setHide((curr) => !curr)}
      >
        {hide === false ? "-" : "+"}
      </button>
      {hide || (
        <p className="text-center text-xs tracking-wide">
          {/* Start adding movies to your list! */}
          <WatchedMovieList watched={watched} />
        </p>
      )}
    </div>
  );
};
const WatchedMovie = ({ filmObj }) => {
  return (
    <li className="grid grid-cols-5 items-center">
      <img src={filmObj.Poster} alt="poster" className="w-10" />
      <p>{filmObj.Title}</p>
      <p>({filmObj.Year})</p>
      <p>{filmObj.userRating}★</p>
      <p>{filmObj.runtime}min</p>
    </li>
  );
};
const WatchedMovieList = ({ watched }) => {
  return (
    <ul className="flex flex-col gap-2">
      {watched.map((film) => (
        <WatchedMovie filmObj={film} key={film.imdbID} />
      ))}
    </ul>
  );
};
export default WatchedMovies;
