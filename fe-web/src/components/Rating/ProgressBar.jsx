const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-500 h-[8px]">
      <div
        className="bg-black-300 h-[8px] transition-all duration-300"
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
