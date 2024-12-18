const NumberChange = ({ change }) => {
  const changeString = change.toString();
  const isPositive = !changeString.startsWith("-");

  return (
    <span
      className={`max-w-fit max-h-fit flex px-1 py-[2px] border rounded border-transparent text-text/xs/medium ${
        isPositive
          ? "text-success-700 bg-success-100"
          : "text-error-700 bg-error-200"
      }`}
    >
      {change}
    </span>
  );
};

export default NumberChange;
