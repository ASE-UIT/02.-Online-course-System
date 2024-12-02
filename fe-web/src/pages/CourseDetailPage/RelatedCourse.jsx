import { CourseCard } from "@/components/Courses/CourseCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useGetCoursesByCategoryIdQuery } from "@/store/rtk/course.services";

function RelatedCourse({ categoryId, courseId }) {
  // Fetch related courses based on categoryId
  const { data, error, isLoading } = useGetCoursesByCategoryIdQuery({
    categoryId,
    limit: 10,  
    page: 1,   
  });

  // Loading state
  if (isLoading) return <p>Loading related courses...</p>;

  // Error handling
  if (error) return <p>Error loading related courses</p>;

  // Ensure we are getting courses
  const relatedCourses = data?.data?.items || [];

  // Filter out the course that matches the current courseId
  const filteredCourses = relatedCourses.filter(item => item.id !== courseId);

  return (
    <div className="related flex gap-[20px] flex-col">
      <header className="text-text-lg/semibold">Khóa học liên quan</header>
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
