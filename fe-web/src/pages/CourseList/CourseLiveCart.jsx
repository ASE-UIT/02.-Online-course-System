import { Link } from "react-router-dom";
import CourseCardIcon from "/picture/CourseCardIcon.svg";
import { formatCurrency } from "@/utils/converter";
import Rating from "@/components/Rating/Rating.jsx";
export const CourseLiveCard = ({ course }) => {
    return (
        <Link
            to={course?.id ? `../course/${course.id}` : "#"}
            className="border-[1px] border-black-50 transition-all duration-500 hover:shadow-xl dark:bg-slate-950 dark:text-white cursor-pointer overflow-hidden rounded-[12px] h-full"
        >
            <div className="overflow-hidden">
                <img
                    src={CourseCardIcon}
                    alt="No image"
                    className="mx-auto h-[160px] w-full object-cover transition duration-700 hover:skew-x-2 "
                />
            </div>
            <div className=" p-3 items-center ">
                <h1 className="line-clamp-2 text-text/md/bold">{course.name}</h1>
                <h1 className="line-clamp-1 py-1 text-text/sm/medium text-black-300">{"Tác giả"}</h1>
                <div className="flex items-center gap-2 opacity-70">
                    <div className="rating flex justify-center items-center gap-3">
                        <h1 className="text-text/xs/semibold text-black-500">{course?.averageRating ? course.averageRating : 0}</h1>
                        <span className="mb-[2px]">
              <Rating rating={course?.averageRating ? course.averageRating : 0} />
            </span>
                        <h1 className="text-text/xs/regular text-black-300">
                            ( {course?.totalReviews ? course?.totalReviews : 0} đánh giá)
                        </h1>
                    </div>
                </div>
                <div className="items-center justify-between py-1">
                    <p className="text-2xl  font-bold text-primary text-text/md/bold">
                        đ{course?.sellPrice && formatCurrency(course.sellPrice)}
                    </p>
                </div>
                {/* {promotion && (
          <div className="promotion py-1 px-[6px] flex gap-[10px] justify-start">
            <div className="bg-success-200 rounded-[4px] p-1 text-text/xs/regular">{promotion}</div>
          </div>
        )} */}
            </div>
        </Link>
    );
};