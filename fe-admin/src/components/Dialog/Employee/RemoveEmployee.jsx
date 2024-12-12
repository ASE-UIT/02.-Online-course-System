const RemoveLecturer = ({ row }) => {
  return (
    <ul>
      RemoveLecturer:{" "}
      <ul>
        {Object.entries(row).map(([key, value], index) =>
          key === "avatar" || key === "id" ? (
            <></>
          ) : (
            <li key={index}>{value}</li>
          )
        )}
      </ul>
    </ul>
  );
};

export default RemoveLecturer;
