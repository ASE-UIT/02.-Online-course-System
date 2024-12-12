const LecturerModalBody = ({ row, isAddOrChange }) => {
  return (
    <div>
      My LecturerModalBody:
      {row !== undefined && (
        <ul>
          {Object.entries(row).map(([key, value], index) =>
            key === "avatar" || key === "id" ? (
              <></>
            ) : (
              <li key={index}>{value}</li>
            )
          )}
        </ul>
      )}
      , {isAddOrChange ? "Thêm" : "Sửa"}
    </div>
  );
};

export default LecturerModalBody;
