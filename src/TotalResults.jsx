const TotalResults = ({ totalResults }) => {
  return (
    <p className="text-[0.6rem] sm:text-xs">
      Found <span className="font-bold">{totalResults}</span> Results
    </p>
  );
};

export default TotalResults;
