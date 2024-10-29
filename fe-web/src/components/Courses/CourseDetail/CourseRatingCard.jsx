import Rating from '@/components/Rating/Rating'
import React from 'react'

const CourseRatingCard = ({
    img,
    name,
    rating,
    since,
    desc
}) => {
  return (
    <div className='flex gap-[10px] flex-col bg-gray-300 rounded-[4px] p-[10px]'>
        <div className="inforBox flex gap-[10px]">
            <div className="icon">
                <img
                src={img}
                alt="No image"
                className="mx-auto h-[32x] w-[32px]  object-cover transition duration-700 hover:skew-x-2 "
                />
            </div>
            <div className="info flex flex-col gap-1">
                <p className='text-text/md/semibold'>{name}</p>
                <span className="mb-[2px] flex items-center gap-[10px] ">
                    <Rating rating={rating} />
                    <p className='text-text/md/regular'>{since}</p>
                </span>
            </div>
        </div>
        <div className="desc">
            {desc}
        </div>
        
    </div>
  )
}

export default CourseRatingCard