import { Course } from "@/components/Courses/Course";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div className="mt-20">
      Home
      <ProductCard />
      <Course />
    </div>
  );
};

export default Home;
