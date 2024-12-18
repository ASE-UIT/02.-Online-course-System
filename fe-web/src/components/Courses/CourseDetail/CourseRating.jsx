import { useState } from "react";
import CourseRatingCard from "./CourseRatingCard";
import { Button } from "@/components/ui/button";
import { useCreateRatingMutation, useSearchRatingQuery } from "@/store/rtk/course.services";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa6";
import EditForm from "./EditForm";

const CourseRating = ({ courseId }) => {
  const studentInfor = useSelector((state) => state.studentInfor);
  const [content, setContent] = useState("");
  const [ratingPoint, setRatingPoint] = useState(5); // Default rating is 5 stars
  const [editingRatingId, setEditingRatingId] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  const { data, isLoading } = useSearchRatingQuery({
    courseId,
    sort: { key: "createAt", type: "DESC" },
  });

  const [createRating] = useCreateRatingMutation();

  const handleRatingContentChange = (e) => setContent(e.target.value);
  const handleRatingChange = (value) => setRatingPoint(value);

  const handleRatingSubmit = async () => {
    if (!studentInfor?.studentInfor?.id) {
      console.error("User is not logged in.");
      return;
    }
    try {
      const payload = {
        courseId,
        studentId: studentInfor.studentInfor.id,
        ratingPoint,
        comment: content,
      };
      if (editingRatingId) {
        await createRating({ ...payload, ratingId: editingRatingId }).unwrap();
        setEditingRatingId(null);
      } else {
        await createRating(payload).unwrap();
      }
      setContent(""); // Reset content
      setRatingPoint(5); // Reset rating
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  const handleEdit = (review) => {
    setSelectedReview(review); // Set the selected review to edit
  };
  const handleCloseEditForm = () => {
    setSelectedReview(null); // Close the modal
  };

  const reviews = data?.data || [];
  const totalRatings = reviews?.length;
  const averageRating = reviews.reduce((sum, review) => sum + (review?.ratingPoint || 0), 0) / totalRatings || 0;

  if (isLoading) return <p>Loading ratings...</p>;

  return (
    <div className="flex flex-col gap-[10px]">
      {/* Summary Section */}
      <div className="summary flex w-1/2 gap-[10px]">
        <FaStar className="text-yellow-400 fill-yellow-400 w-[24px] h-[24px]" />
        <p className="text-text/lg/semibold flex gap-10">
          {averageRating.toFixed(1)} xếp hạng khoá học • {totalRatings} đánh giá
        </p>
      </div>

      {/* Rating Form */}
      {studentInfor?.studentInfor?.id && (
        <>
          {/* Star Rating */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((el) => (
              <FaStar
                key={el}
                onClick={() => handleRatingChange(el)}
                className={`cursor-pointer text-2xl ${ratingPoint >= el ? "text-yellow-500" : "text-gray-500"}`}
              />
            ))}
          </div>

          {/* Rating Form */}
          <div className="form w-full">
            <textarea
              value={content}
              onChange={handleRatingContentChange}
              placeholder="Write your comment here..."
              className="border h-[150px] p-2 w-full"
            />
          </div>
          <div
            onClick={handleRatingSubmit}
            className="w-[100px] text-center cursor-pointer text-white font-semibold py-2 bg-primary-color inline-block rounded-md"
          >
            {editingRatingId ? "Cập nhật" : "Đánh giá"}
          </div>
        </>
      )}

      {/* Ratings List */}
      <div className="content flex flex-col gap-[10px]">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id}>
              <CourseRatingCard review={review} userId={studentInfor?.studentInfor?.id} onEdit={handleEdit} />
              {/* Display Edit Form below the review if it's selected for editing */}
              {selectedReview && selectedReview?.id === review?.id && (
                <EditForm review={selectedReview} onClose={handleCloseEditForm} />
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
      </div>

      {/* Load More Button */}
      {totalRatings > reviews?.length && (
        <div className="more-btn flex justify-center">
          <Button
            variant="outline"
            className="text-text/md/semibold text-black-500 border-black-500 border-[1px] md:text-base"
          >
            Xem thêm đánh giá
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseRating;
