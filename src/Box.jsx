import Error from "./Error";
import Loader from "./Loader";
const Box = ({ type, movies, error, loader }) => {
  if (type === "left")
    return (
      <div className="flex-1 border-r-2 border-stone-500 p-4 overflow-auto">
        {error === true ? (
          <Error />
        ) : loader === true ? (
          <Loader />
        ) : (
          <MovieList movies={movies} />
        )}
      </div>
    );

  return <div className="flex-1  p-4">right</div>;
};

const Movie = ({ movieObj }) => {
  return (
    <li className="bg-stone-300 rounded-lg p-2 cursor-pointer flex gap-2 hover:bg-red-50 transition-all duration-150">
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

const MovieList = ({ movies }) => {
  return (
    <ul className="flex flex-col gap-4 ">
      {movies?.map((movie) => (
        <Movie movieObj={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

export default Box;
