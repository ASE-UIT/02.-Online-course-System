import { CourseCard } from "@/components/Courses/CourseCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useGetCourseRecommendationQuery } from "@/store/rtk/course.services";

function RelatedCourse({ courseId }) {
  const { data, error, isLoading } = useGetCourseRecommendationQuery(6);

  if (isLoading) return <p>Loading related courses...</p>;

  if (error) return <p>Error loading related courses</p>;

  const relatedCourses = data?.data || [];

  const filteredCourses = relatedCourses.filter((item) => item.id !== courseId);

  return (
    <div className="related flex gap-[20px] flex-col">
      <header className="text-text-lg/semibold">Khóa học gợi ý</header>
      <div className="content">
        {/* Render courses in a carousel */}
        <Carousel>
          <CarouselContent>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((item, index) => (
                <CarouselItem className="basis-1/3" key={index}>
                  <CourseCard course={item} />
                </CarouselItem>
              ))
            ) : (
              <p>No related courses found.</p>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default RelatedCourse;
