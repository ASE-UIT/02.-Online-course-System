import { useGetCategoriesQuery } from "@/store/rtk/course.services";
import CourseCardIcon from "/picture/CourseCardIcon.svg";
import CategoryCard from "@/components/Category/CategoryCard";

export default function CategoryCourse() {
  const { data: categoryResponse } = useGetCategoriesQuery();
  const categories = categoryResponse?.data ? categoryResponse.data : [];
  return (
    <>
      <div className="flex justify-between mt-6">
        <p className="text-text/lg/bold">
          Khám phá <span className="text-primary-500">EduHub</span>
        </p>
      </div>
      <div className="grid grid-cols-3 mt-4  gap-[1rem]">
        {categories.map((category, idx) => {
          return (
            <CategoryCard
              category={category.name}
              subcategory={["Speaking"]}
              img={category.thumbnail || CourseCardIcon}
              key={idx}
            ></CategoryCard>
          );
        })}
      </div>
    </>
  );
}
