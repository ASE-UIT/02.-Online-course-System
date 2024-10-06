import React from 'react'
import { CourseCard } from './CourseCard'


const CourseData = [
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIY4C_BpwVZnzcjH00DjGJ4h4X99q4CAAqGg&s',
        title: "Learn to speak English fluently",
        author: "Vermani",
        rating: "4",
        ratingNum: "100",
        price: 170000,
      },
      {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIY4C_BpwVZnzcjH00DjGJ4h4X99q4CAAqGg&s',
        title: "Learn to speak English fluently",
        author: "Vermani",
        rating: "3.5",
        ratingNum: "100",
        price: 170000,
      }
]
export const Course = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container ">
      
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 transition-all duration-300 ease-in-out">
            {CourseData.map((item, index) => (
              <CourseCard
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>
    </div>
  )
}