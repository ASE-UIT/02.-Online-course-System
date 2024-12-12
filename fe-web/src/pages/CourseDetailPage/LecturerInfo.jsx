import { BookOpenCheck, Smile, Star, UsersRound } from "lucide-react";

export default function LecturerInfo({ course }) {
  const lecturer = course?.lecturer || null;
  if (!lecturer) return <></>;
  return (
    <div
      style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)" }}
      className="w-[450px] mx-auto mt-[25px] p-[20px] rounded-md"
    >
      <div className="flex gap-4">
        <div
          className="w-[70px] bg-cover h-[70px] rounded-full"
          style={{
            backgroundImage: `url(${
              lecturer?.avatar ||
              "https://s3-alpha-sig.figma.com/img/5641/7762/309a183aa654f1aef9769c111e38197a?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gtlKAshVvgQFjbAgbNr3ddFdRY5KQAE-UYivYe0wTyg-hLWt2xWkMoWYndnqsqGOuDKT0PBf4xyvtf-16TuZUH4~5yf6wJVzRkWvsGxuf2OCvbOkYKgvREXPyaoIYPHYQEW-m-P17---DOAJaLesG9kJZiRapvOcYlV-Q~IP8Ka2xmf8mY~X4fk2yYEJcAZto1I71aQ5J2NNCqvSbJvFhrp1xdGT~LLZ2UO6GGjI6DCEsGATO2T5cfGG3tDswJPTzQe3i4HlinNu86NiqvZ-YM6PkyOSUVCmcC4CxhEDxtJNFAORv-aVCvOSj0NsMF9eckLuqa-Cg4DYtLQr2qeUIQ__"
            })`,
          }}
        ></div>
        <div className="flex-1">
          <p className="text-text/lg/semibold">{lecturer?.name}</p>
          <p className="text-text/md/regular line-clamp-2 mt-1">{lecturer?.bio}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-4 gap-3">
        <div className="flex items-center gap-2">
          <Smile className="w-[20px] h-[20px]" />
          <p className="text-text/md/regular">{course?.lecturerStats?.averageRating} xếp hạng</p>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-[20px] h-[20px]" />
          <p className="text-text/md/regular">{course?.lecturerStats?.totalRating} đánh giá</p>
        </div>
        <div className="flex items-center gap-2">
          <UsersRound className="w-[20px] h-[20px]" />
          <p className="text-text/md/regular">{course?.lecturerStats?.totalStudents} học viên</p>
        </div>
        <div className="flex items-center gap-2">
          <BookOpenCheck className="w-[20px] h-[20px]" />
          <p className="text-text/md/regular">{course?.lecturerStats?.totalCourses} khoá học</p>
        </div>
      </div>
      <div
        style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)" }}
        className="flex mt-6 items-center justify-center text-text/md/semibold h-[40px] rounded-[4px] "
      >
        Xem chi tiết
      </div>
    </div>
  );
}
