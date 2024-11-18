import Rating from '@/components/Rating/Rating'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import RangeSlider from '@/components/ui/slider'
import { Sliders, SlidersHorizontal } from 'lucide-react'
import React, { useState } from 'react'
const levels = [
    {id:1, name: "Tất cả mức độ"},{id:2, name: "Người mới"},{id:3, name: "Trung cấp"},{id:4, name:"Chuyên gia"}
];
const lengths = [
    {id:1, name: "0-1 tiếng"},{id:2, name: "1-3 tiếng"},{id:3, name: "3-6 tiếng"},{id:4, name:"6-17 tiếng"},{id:5, name: "trên 17 tiếng"}
];
const Filter = () => {
const [selectedRatings, setSelectedRatings] = useState([]);
const [selectedLevels, setSelectedLevels] = useState([]);
const [selectedLengths, setSelectedLengths] = useState([]);
const handleCheckboxChange = (rating) => {
        if (selectedRatings === rating) {
            setSelectedRatings(null);
          } else {
            setSelectedRatings(rating);
        }
      };
const handleLevelChange = (levelId) => {
        if (selectedLevels.includes(levelId)) {
          setSelectedLevels(selectedLevels.filter((id) => id !== levelId));
        } else {
          setSelectedLevels([...selectedLevels, levelId]);
        }
      };
const handleLengthChange = (lengthId) => {
        if (selectedLengths.includes(lengthId)) {
            setSelectedLengths(selectedLengths.filter((id) => id !== lengthId));
        } else {
            setSelectedLengths([...selectedLengths, lengthId]);
        }
      };
  return (
    <div className='p-5 flex flex-col gap-[20px]  rounded-[20px] shadow-lg'>
        <RangeSlider />
        <div className="rating flex flex-col gap-[10px]">
            <label className="text-text/md/semibold">Đánh giá</label>
            <div className="ratingChose flex flex-col gap-[10px]">
                {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-[10px]">
                    {/* Checkbox for the rating */}
                    <Checkbox
                    checked={selectedRatings === rating}
                    onCheckedChange={() => handleCheckboxChange(rating)}
                    id={`rating-${rating}`}
                    className="cursor-pointer rounded-full"
                    />
                    <label
                    htmlFor={`rating-${rating}`}
                    className="cursor-pointer flex items-center gap-2"
                    >
                    <Rating rating={rating} className="text-red-yellow h-5 w-5" />
                    </label>
                    <p className='text-black-100 text-text/sm/regular'>(10,000)</p>
                </div>
                ))}
            </div>
        </div>
        <div className="level flex flex-col gap-[10px]">
            <label className="text-text/md/semibold font-worksans">Mức độ</label>
            <div className="lvList flex flex-col gap-[10px]">
            {levels.map((lv) => (
                <div key={lv.id} className="flex items-center gap-[10px]">
                <Checkbox
                    checked={selectedLevels.includes(lv.id)}
                    onCheckedChange={() => handleLevelChange(lv.id)}
                    id={`level-${lv.id}`}
                    className="cursor-pointer rounded-[2px]"
                />
                <label htmlFor={`level-${lv.id}`} className="cursor-pointer text-text/sm/regular">
                    {lv.name}
                </label>
                <p className='text-black-100 text-text/sm/regular'>(10,000)</p>
                </div>
            ))}
            </div>
        </div>
        <div className="length flex flex-col gap-[10px]">
        <label className="text-text/md/semibold font-worksans">Thời gian video</label>
            <div className="lengthList flex flex-col gap-[10px]">
            {lengths.map((length) => (
                <div key={length.id} className="flex items-center gap-[10px]">
                <Checkbox
                    checked={selectedLengths.includes(length.id)}
                    onCheckedChange={() => handleLengthChange(length.id)}
                    id={`length-${length.id}`}
                    className="cursor-pointer rounded-[2px]"
                />
                <label htmlFor={`level-${length.id}`} className="cursor-pointer text-text/sm/regular">
                    {length.name}
                </label>
                <p className='text-black-100 text-text/sm/regular'>(10,000)</p>
                </div>
            ))}
            </div>
        </div>
        <div className="buttons flex gap-[10px] justify-between">
            <Button className="px-4 py-3 w-[164px]">Áp dụng</Button>
            <Button className="px-4 py-3 w-[164px]" variant="outline">Đặt lại</Button>
        </div>
    </div>
  )
}

export default Filter
