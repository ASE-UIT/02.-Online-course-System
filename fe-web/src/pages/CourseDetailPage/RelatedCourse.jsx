import { CourseCard } from "@/components/Courses/CourseCard";
import { CourseData } from "@/components/Courses/Course";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function RelatedCourse() {
  return (
    <div className="related flex gap-[20px] flex-col">
      <header className="text-text/lg/semibold">Khóa học liên quan</header>
      <div className="content">
        <Carousel>
          <CarouselContent>
            {CourseData.map((item, index) => (
              <CarouselItem className="basis-1/3" key={index}>
                <CourseCard key={index} {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default RelatedCourse;
