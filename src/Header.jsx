const Header = ({ children }) => {
  return (
    <div className="flex gap-5 item items-center justify-between p-3 px-5 border-b-2 border-stone-400">
      <h1 className="text-l md:text-2xl md:tracking-wide font-bold">
        CineTime
      </h1>
      {children}
    </div>
  );
};

export default Header;
