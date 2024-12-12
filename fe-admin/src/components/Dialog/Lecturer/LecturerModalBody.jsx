const LecturerModalBody = ({ id, isAddOrChange }) => {
  return (
    <div>
      My LecturerModalBody: {id}, {isAddOrChange ? "Thêm" : "Sửa"}
    </div>
  );
};

export default LecturerModalBody;
