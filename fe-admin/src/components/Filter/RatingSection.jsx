import React, { useState } from 'react'
import Rating from '../Rating/Rating'
import { Checkbox } from '../ui/checkbox'

const RatingSection = () => {
const [selectedRatings, setSelectedRatings] = useState([]);
const handleCheckboxChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };
  return (
    <div className='w-full'>
        {/* Rating Filter */}
        <div className="rating flex flex-col gap-[10px] w-full text-left items-start">
            <label className="text-text/md/semibold">Đánh giá</label>
            <div className="ratingChose flex flex-col gap-[10px]">
                {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-[10px]">
                    <Checkbox
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={() => handleCheckboxChange(rating)}
                    id={`rating-${rating}`}
                    className="cursor-pointer rounded-full"
                    />
                    <label htmlFor={`rating-${rating}`} className="cursor-pointer flex items-center gap-2">
                    <Rating rating={rating} className="text-red-yellow h-5 w-5" />
                    </label>
                    <p className="text-black-100 text-text/sm/regular">(10,000)</p>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default RatingSection