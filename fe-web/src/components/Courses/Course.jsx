import React from "react";
import { CourseCard } from "./CourseCard";

export const CourseData = [
  {
    img: "https://s3-alpha-sig.figma.com/img/d628/d693/04cfd323cc9721e8f01abd84ea0386b4?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N4Q9mPBB3zqehHB-~QJqRbcNQBXi7IgEH3DC1PFKN8PkzO4mfIvGhy1cVcr060cbBw9bSpE9Q1Bc8HFdmyrOFNOJAMBmIRkmbTevy027HMnCHdEQX~T8nw66Wd90ZqKMVoEjkQPimYXWxTx8xjlX5zn-~GbLOUeAV5h68LYKx7a49THmrEw7uY0aPT5qkm9YIlYWbCnSC59INHZATCuOZ~oaIfHAr7js23vELKUW0NDwEQyl7PYL3BhWlFD8VBSVuBD7hXjgVFhufjZ0pjd3ZmXbhilfW~Dez8CRuACsQSA85rXN24ZklS3oaPWtBMs4rGH3YM7pWVlAKB3TF0sJAg__",
    title: "Tiêu đề",
    author: "Tác giả",
    rating: "4",
    ratingNum: "n",
    price: 100000,
    promotion: "Best seller",
  },
  {
    img: "https://s3-alpha-sig.figma.com/img/d628/d693/04cfd323cc9721e8f01abd84ea0386b4?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N4Q9mPBB3zqehHB-~QJqRbcNQBXi7IgEH3DC1PFKN8PkzO4mfIvGhy1cVcr060cbBw9bSpE9Q1Bc8HFdmyrOFNOJAMBmIRkmbTevy027HMnCHdEQX~T8nw66Wd90ZqKMVoEjkQPimYXWxTx8xjlX5zn-~GbLOUeAV5h68LYKx7a49THmrEw7uY0aPT5qkm9YIlYWbCnSC59INHZATCuOZ~oaIfHAr7js23vELKUW0NDwEQyl7PYL3BhWlFD8VBSVuBD7hXjgVFhufjZ0pjd3ZmXbhilfW~Dez8CRuACsQSA85rXN24ZklS3oaPWtBMs4rGH3YM7pWVlAKB3TF0sJAg__",
    title: "Tiêu đề",
    author: "Tác giả",
    rating: "4",
    ratingNum: "n",
    price: 100000
  },
  {
    img: "https://s3-alpha-sig.figma.com/img/d628/d693/04cfd323cc9721e8f01abd84ea0386b4?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N4Q9mPBB3zqehHB-~QJqRbcNQBXi7IgEH3DC1PFKN8PkzO4mfIvGhy1cVcr060cbBw9bSpE9Q1Bc8HFdmyrOFNOJAMBmIRkmbTevy027HMnCHdEQX~T8nw66Wd90ZqKMVoEjkQPimYXWxTx8xjlX5zn-~GbLOUeAV5h68LYKx7a49THmrEw7uY0aPT5qkm9YIlYWbCnSC59INHZATCuOZ~oaIfHAr7js23vELKUW0NDwEQyl7PYL3BhWlFD8VBSVuBD7hXjgVFhufjZ0pjd3ZmXbhilfW~Dez8CRuACsQSA85rXN24ZklS3oaPWtBMs4rGH3YM7pWVlAKB3TF0sJAg__",
    title: "Tiêu đề",
    author: "Tác giả",
    rating: "4",
    ratingNum: "n",
    price: 100000
  },
  {
    img: "https://s3-alpha-sig.figma.com/img/d628/d693/04cfd323cc9721e8f01abd84ea0386b4?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N4Q9mPBB3zqehHB-~QJqRbcNQBXi7IgEH3DC1PFKN8PkzO4mfIvGhy1cVcr060cbBw9bSpE9Q1Bc8HFdmyrOFNOJAMBmIRkmbTevy027HMnCHdEQX~T8nw66Wd90ZqKMVoEjkQPimYXWxTx8xjlX5zn-~GbLOUeAV5h68LYKx7a49THmrEw7uY0aPT5qkm9YIlYWbCnSC59INHZATCuOZ~oaIfHAr7js23vELKUW0NDwEQyl7PYL3BhWlFD8VBSVuBD7hXjgVFhufjZ0pjd3ZmXbhilfW~Dez8CRuACsQSA85rXN24ZklS3oaPWtBMs4rGH3YM7pWVlAKB3TF0sJAg__",
    title: "Tiêu đề",
    author: "Tác giả",
    rating: "4",
    ratingNum: "n",
    price: 100000
  }
];
export const Course = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container ">
        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 transition-all duration-300 ease-in-out">
          {CourseData.map((item, index) => (
            <CourseCard key={index} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};
