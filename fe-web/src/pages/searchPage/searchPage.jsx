import { ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import { CourseCard } from '@/components/Courses/CourseCard';
import { courseApi } from '@/api/courseApi';
const mockCourseData = [
    {
      id: 1,
      name: "React for Beginners",
      price: 150000,
      rating: 4,
      numRatings: 100,
      author: "John Doe",
      image: "/picture/CourseCardIcon.svg"
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      price: 200000,
      rating: 5,
      numRatings: 250,
      author: "Jane Smith",
      image: "/picture/CourseCardIcon.svg"
    },
    {
      id: 3,
      name: "Node.js and Express",
      price: 180000,
      rating: 4.5,
      numRatings: 150,
      author: "Mark Johnson",
      image: "/picture/CourseCardIcon.svg"
    },
    {
      id: 4,
      name: "CSS Mastery",
      price: 120000,
      rating: 4.8,
      numRatings: 90,
      author: "Emily Davis",
      image: "/picture/CourseCardIcon.svg"
    },
    {
      id: 5,
      name: "HTML and CSS Fundamentals",
      price: 100000,
      rating: 4.2,
      numRatings: 80,
      author: "Sarah Brown",
      image: "/picture/CourseCardIcon.svg"
    },
    {
      id: 6,
      name: "Full Stack Web Development",
      price: 250000,
      rating: 4.9,
      numRatings: 320,
      author: "Michael Lee",
      image: "/picture/CourseCardIcon.svg"
    },
    {
      id: 7,
      name: "Intro to Python Programming",
      price: 130000,
      rating: 4.4,
      numRatings: 110,
      author: "Olivia Taylor",
      image: "/picture/CourseCardIcon.svg"
    },
    {
      id: 8,
      name: "Java for Beginners",
      price: 170000,
      rating: 4.7,
      numRatings: 210,
      author: "Daniel Harris",
      image: "/picture/CourseCardIcon.svg"
    },
    {
      id: 9,
      name: "Web Design Principles",
      price: 140000,
      rating: 4.3,
      numRatings: 95,
      author: "Sophia Clark",
      image: "/picture/CourseCardIcon.svg"
    }
  ];
  
const SearchPage = () => {
const [liveCourses, setLiveCourses] = useState([]);
const getLiveCourses = async () => {
    const response = await courseApi.getLiveCourses();
    if (response?.success) {
      setLiveCourses(response.data);
    }
  };
  useEffect(() => {
    getLiveCourses();
  }, []);
  return (
    <div className="flex justify-center">
        <div className='py-5 px-20 '>
            <div className="header flex justify-between items-center">
                <label className='text-display/md/semibold'>12 kết quả cho từ khoá “x"</label>
                <div className="sort border rounded-[8px] w-[230px] ">
                    <div className="sort flex gap-[20px] justify-center py-[10px] px-[20px] items-center">
                        <div className="text flex flex-col gap-2 w-[150px]">
                            <p className='text-text/xs/semibold'>Sắp xếp theo</p>
                            <p className='text-text/md/regular'>Liên quan nhất</p>
                        </div>
                        <div className="icon">
                            <ChevronDown/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="body flex gap-[20px] justify-between ">
                <div className="filter w-[376px] ">
                <Filter/>
                </div>
                <div className="content">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-x-[36px] gap-y-[16px]">
                        {mockCourseData.map((course, idx) => {
                        return <CourseCard key={idx} course={course} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchPage