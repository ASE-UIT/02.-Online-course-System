import Rating from "../Rating/Rating";

export const CourseCard = ({
  img,
  title,
  author,
  rating,
  ratingNum,
  price,
}) => {
  return (
    <div className="shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-950 dark:text-white cursor-pointer border border-gray-300 overflow-hidden rounded-xl">
      <div className="overflow-hidden">
        <img
          src={img}
          alt="No image"
          className="mx-auto h-[220px] w-full object-cover transition duration-700 hover:skew-x-2 "
        />
      </div>
      <div className="space-y-2 p-3 items-center ">
        <h1 className="line-clamp-2 font-bold text-xl">{title}</h1>
        <h1 className="line-clamp-1 font-bold text-md text-secondary">
          {author}
        </h1>
        <div className="flex items-center gap-2 opacity-70">
          <div className="rating flex justify-center items-center gap-3">
            <h1>{rating}</h1>
            <span className="mb-[2px]">
              <Rating rating={rating} />
            </span>
            <h1> ( {ratingNum} đánh giá) </h1>
          </div>
        </div>

        <div className="items-center justify-between  py-3 !mt-3">
          <p className="text-2xl  font-bold text-primary">{price}đ</p>
        </div>
      </div>
    </div>
  );
};
