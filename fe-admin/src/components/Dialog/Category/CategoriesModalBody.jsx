const CategoriesModalBody = ({ id, isAddOrChange }) => {
  return (
    <div>
      My CategoriesModalBody: {id}, {isAddOrChange ? "Thêm" : "Sửa"}
    </div>
  );
};

export default CategoriesModalBody;
