import Rating from "@/components/Rating/Rating";
import { formatDate } from "@/utils/converter";
import { FaEdit } from "react-icons/fa";

const CourseRatingCard = ({ review, userId, onEdit }) => {
  const handleEditClick = () => {
    if (onEdit) onEdit(review); // Ensure onEdit is a function before calling it
  };

  //   const handleDeleteClick = () => {
  //     if (onDelete) onDelete(review.id); // Ensure onDelete is a function before calling it
  //   };
  const avatar = review?.student?.avatar || "https://via.placeholder.com/32";
  const name = review?.student?.name || "Anonymous";
  return (
    <div className="flex gap-[10px] flex-col bg-gray-300 rounded-[4px] p-[10px] w-full">
      <div className="inforBox flex gap-[10px]">
        <div className="icon">
          <img
            src={avatar}
            alt="No image"
            className="mx-auto h-[32px] w-[32px] object-cover transition duration-700 hover:skew-x-2"
          />
        </div>
        <div className="info flex flex-col gap-1 w-full">
          <div className="flex justify-between">
            <div className="content">
              <p className="text-text/md/semibold">{name}</p>
              <span className="mb-[2px] flex items-center gap-[10px]">
                <Rating rating={review.ratingPoint} />
                <p className="text-text/md/regular">{formatDate(review.updateAt)}</p>
              </span>
            </div>
            <div className="buttons">
              {review.studentId === userId && (
                <div className="flex space-x-2 mt-2">
                  <button onClick={handleEditClick} className="text-blue-500 flex items-center">
                    <FaEdit className="mr-1" />
                  </button>
                  {/* <button onClick={handleDeleteClick} className="text-red-500">
                    <FaTrashAlt />
                  </button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="desc">{review.comment}</div>
    </div>
  );
};

export default CourseRatingCard;
