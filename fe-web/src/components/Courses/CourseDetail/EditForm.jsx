import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useUpdateRatingMutation } from "@/store/rtk/course.services"; // Assuming your RTK API is defined here

const EditForm = ({ review, onClose }) => {
  const [content, setContent] = useState(review?.comment);
  const [ratingPoint, setRatingPoint] = useState(review?.ratingPoint);
  const [updateRating] = useUpdateRatingMutation();

  const handleRatingChange = (value) => {
    setRatingPoint(Math.round(value));
  };

  const handleRatingContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleRatingSubmit = async () => {
    console.log("Rating before submit:", ratingPoint);
    const integerRating = Math.round(ratingPoint);
    const payload = {
      courseId: review?.courseId,
      studentId: review?.studentId,
      ratingPoint: integerRating,
      comment: content,
    };
    console.log("pl", payload);
    try {
      await updateRating({ id: review?.id, payload }).unwrap();
      onClose();
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div className="modal flex justify-center items-center fixed inset-0 bg-black bg-opacity-50">
      <div className="modal-content bg-white p-4 w-[350px] rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-center mb-4">Edit Your Rating</h3>

        {/* Star Rating */}
        <div className="flex gap-2 justify-center mb-4">
          {[1, 2, 3, 4, 5].map((el) => (
            <FaStar
              key={el}
              onClick={() => handleRatingChange(el)}
              className={`cursor-pointer text-2xl ${ratingPoint >= el ? "text-yellow-500" : "text-gray-500"}`}
            />
          ))}
        </div>

        {/* Comment Textarea */}
        <div className="form w-full mb-4">
          <textarea
            value={content}
            onChange={handleRatingContentChange}
            placeholder="Write your comment here..."
            className="border h-[100px] p-2 w-full rounded-md resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <div
            onClick={handleRatingSubmit}
            className="w-[80px] text-center cursor-pointer text-white font-semibold py-2 bg-primary-color rounded-md"
          >
            Cập nhật
          </div>
          <button onClick={onClose} className="text-red-500 font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
