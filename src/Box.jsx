const Box = ({ type, movies }) => {
  if (type === "left")
    return (
      <div className="flex-1 bg-red-100 p-4">
        <MovieList movies={movies} />
      </div>
    );

  return <div className="flex-1 bg-blue-100 p-4">right</div>;
};

const Movie = ({ movieObj }) => {
  return (
    <li>
      <p>{movieObj.Title}</p>
    </li>
  );
};

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies?.map((movie) => (
        <Movie movieObj={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

export default Box;
