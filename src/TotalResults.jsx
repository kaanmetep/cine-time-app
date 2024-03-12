const TotalResults = ({ totalResults }) => {
  return (
    <p className="text-xs">
      Found <span className="font-bold">{totalResults}</span> Results
    </p>
  );
};

export default TotalResults;
