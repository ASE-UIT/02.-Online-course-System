import { Button } from "@/components/ui/button";
import LiveCourse from "./LiveCourse";
import MostSellerCourse from "./MostSellerCourse";
import NewestCourse from "./NewestCourse";
import HomePageIntro from "./HomePageIntro";
import CategoryCourse from "./CategoryCourse";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    document.title = "Eduhub | Student";
  }, []);

  return (
    <div>
      <HomePageIntro />
      <div className="px-24">
        <LiveCourse />
        <MostSellerCourse />
        <NewestCourse />
        <CategoryCourse />
        <div className="mt-4 flex justify-center">
          <Button className="text-text/md/semibold text-white">
            Xem tất cả
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
