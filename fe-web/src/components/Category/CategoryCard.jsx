import React from 'react'

const CategoryCard = ({
    img,
    category,
    subcategory
}) => {
  return (
    <div className=' border p-2 rounded-xl'>
        <div className="content flex gap-10">
            <div className="overflow-hidden items-center text-center">
                <img
                    src={img}
                    alt="No image"
                    className="mx-auto h-[120px] w-[120px]  object-cover transition duration-700 hover:skew-x-2 "
                />
            </div>
            <div className="title">
                <h1 className="line-clamp-2 font-bold text-xl hover:scale-105 hover:cursor-pointer">{category}</h1>
                <div className='subtcategory'>
                    <ul className="mt-2">
                            {subcategory?.map((sub, index) => (
                                <li key={index} className="text-md text-gray-600 hover:cursor-pointer hover:font-semibold">
                                    {sub}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
   
  )
}

export default CategoryCard