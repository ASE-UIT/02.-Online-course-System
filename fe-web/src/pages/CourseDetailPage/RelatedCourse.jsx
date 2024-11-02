import { CourseCard } from "@/components/Courses/CourseCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
export const CourseData = [
  {
    img: "https://s3-alpha-sig.figma.com/img/d628/d693/04cfd323cc9721e8f01abd84ea0386b4?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N4Q9mPBB3zqehHB-~QJqRbcNQBXi7IgEH3DC1PFKN8PkzO4mfIvGhy1cVcr060cbBw9bSpE9Q1Bc8HFdmyrOFNOJAMBmIRkmbTevy027HMnCHdEQX~T8nw66Wd90ZqKMVoEjkQPimYXWxTx8xjlX5zn-~GbLOUeAV5h68LYKx7a49THmrEw7uY0aPT5qkm9YIlYWbCnSC59INHZATCuOZ~oaIfHAr7js23vELKUW0NDwEQyl7PYL3BhWlFD8VBSVuBD7hXjgVFhufjZ0pjd3ZmXbhilfW~Dez8CRuACsQSA85rXN24ZklS3oaPWtBMs4rGH3YM7pWVlAKB3TF0sJAg__",
    name: "Tiêu đề",
    author: "Tác giả",
    rating: "4",
    ratingNum: "n",
    price: 100000,
    promotion: "Best seller",
  },
];
function RelatedCourse() {
  return (
    <div className="related flex gap-[20px] flex-col">
      <header className="text-text/lg/semibold">Khóa học liên quan</header>
      <div className="content">
        <Carousel>
          <CarouselContent>
            {CourseData.map((item, index) => (
              <CarouselItem className="basis-1/3" key={index}>
                <CourseCard key={index} course={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default RelatedCourse;
