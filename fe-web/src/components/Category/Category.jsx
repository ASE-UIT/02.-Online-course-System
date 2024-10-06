import React from 'react'
import CategoryCard from './CategoryCard'


const CategoryData = [
    {
        img: 'https://static.vecteezy.com/system/resources/previews/017/300/766/non_2x/learning-english-doodle-set-language-school-in-sketch-style-online-language-education-course-hand-drawn-illustration-isolated-on-white-background-vector.jpg',
        category: 'Tiếng Anh',
        subcategory: ['Grammar cho người mới', 'Speaking', 'Writing', 'Listening']


      },
      {
        img: 'https://infinitylearn.com/surge/wp-content/uploads/2021/12/MicrosoftTeams-image-58.jpg',
        category: "Toán",
        subcategory: ['Algebra','Geometry']
      }
]


const Category = () => {
  return (
    <div className=" mx-10 grid xl:grid-cols-4 grid-cols-2 gap-10">
      {CategoryData.map((item, index) => (
              <CategoryCard
                key={index}
                {...item}
              />
            ))}
    </div>
  )
}

export default Category