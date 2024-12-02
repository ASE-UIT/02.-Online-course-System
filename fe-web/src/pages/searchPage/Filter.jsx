import Rating from '@/components/Rating/Rating'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import RangeSlider from '@/components/ui/slider'
import { useGetCategoriesQuery } from '@/store/rtk/course.services'
import { ChevronDown, Sliders, SlidersHorizontal } from 'lucide-react'
import React, { useState } from 'react'
const levels = [
    {id:1, name: "Người mới"},{id:2, name: "Trung cấp"},{id:3, name: "Chuyên gia"}
];
const lengths = [
    { id: 1, name: "0-1 tiếng", min: 0, max: 1 },      // Duration in hours: 0-1
    { id: 2, name: "1-3 tiếng", min: 1, max: 3 },      // Duration in hours: 1-3
    { id: 3, name: "3-6 tiếng", min: 3, max: 6 },      // Duration in hours: 3-6
    { id: 4, name: "6-17 tiếng", min: 6, max: 17 },    // Duration in hours: 6-17
    { id: 5, name: "Trên 17 tiếng", min: 17, max: 999 } // Duration greater than 17 hours
  ];
  
  const Filter = ({ onFilterChange }) => {
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedLengths, setSelectedLengths] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 3500000]); 
    const { data, error, isLoading } = useGetCategoriesQuery();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const categories = data?.data || [];
    // console.log("Categories Data:", categories)
    // Handle rating change (filter by rating >= selected)
    const handleCheckboxChange = (rating) => {
      setSelectedRatings((prev) =>
        prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
      );
    };
  
    // Handle level selection
    const handleLevelChange = (levelId) => {
      setSelectedLevels((prev) =>
        prev.includes(levelId) ? prev.filter((id) => id !== levelId) : [...prev, levelId]
      );
    };
  
    // Handle length selection (duration)
    const handleLengthChange = (length) => {
        setSelectedLengths((prev) => {
          const exists = prev.find((item) => item.min === length.min && item.max === length.max);
          if (exists) {
            // Remove the length if it's already selected
            return prev.filter((item) => item.min !== length.min || item.max !== length.max);
          } else {
            // Add the new length
            return [...prev, length];
          }
        });
      };
      
    
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false); 
        onFilterChange({ category: category.id }); 
    };
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev); 
      };
  
    // Apply filters and pass them to the parent
    const applyFilters = () => {
      const filters = {
        ratings: selectedRatings,
        levels: selectedLevels,
        lengths: selectedLengths.map(({ min, max }) => ({ min, max })),
        category: selectedCategory,
        price: priceRange,
      };
      onFilterChange(filters); // Passing the selected filters back to parent component
    };
    const resetFilters = () => {
        setSelectedRatings([]);
        setSelectedLevels([]);
        setSelectedLengths([]);
        setPriceRange([0, 3500000]);
        setSelectedCategory(null);
        onFilterChange({ ratings: [], levels: [], lengths: [], category: null, price: [0, 3500000] });
    };
  
    return (
      <div className="p-5 flex flex-col gap-[20px] rounded-[20px] shadow-lg">
        {/* RangeSlider component can be customized for other filters */}
        <RangeSlider  onPriceChange={setPriceRange}/>
        
        {/* Rating Filter */}
        <div className="rating flex flex-col gap-[10px]">
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
  
        {/* Level Filter */}
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
                <p className="text-black-100 text-text/sm/regular">(10,000)</p>
              </div>
            ))}
          </div>
        </div>
          {/* Category Dropdown */}
        <div className="flex justify-between">
            <label className="text-text/md/semibold font-worksans">Danh mục</label>
            <div className="button flex relative">
            <Button
                variant="gray"
                className="flex items-center gap-2"
                onClick={toggleDropdown} // Toggle dropdown on button click
            >
                {/* Display selected category name or default */}
                <span>{selectedCategory ? selectedCategory.name : "Chọn danh mục"}</span>
                <ChevronDown />
            </Button>

            {/* Dropdown content */}
            
        {/* Dropdown content */}
            {isDropdownOpen && (
            <div className="absolute bg-white shadow-md mt-2 w-[200px] rounded-md border">
                {isLoading ? (
                <p className="p-2">Loading...</p>
                ) : error ? (
                <p className="p-2">Error fetching categories</p>
                ) : (
                categories.map((category) => (
                    <div
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                    <span>{category.name}</span>
                    </div>
                ))
                )}
            </div>
            )}
            </div>
        </div>
        {/* Duration Filter */}
        <div className="length flex flex-col gap-[10px]">
          <label className="text-text/md/semibold font-worksans">Thời gian video</label>
          <div className="lengthList flex flex-col gap-[10px]">
            {lengths.map((length) => (
              <div key={length.id} className="flex items-center gap-[10px]">
                <Checkbox
                    checked={selectedLengths.some(
                        (item) => item.min === length.min && item.max === length.max
                    )}
                  onCheckedChange={() => handleLengthChange(length)}
                  id={`length-${length.id}`}
                  className="cursor-pointer rounded-[2px]"
                />
                <label htmlFor={`length-${length.id}`} className="cursor-pointer text-text/sm/regular">
                  {length.name}
                </label>
                <p className="text-black-100 text-text/sm/regular">(10,000)</p>
              </div>
            ))}
          </div>
        </div>
  
        
  
        {/* Apply and Reset Buttons */}
        <div className="buttons flex gap-[10px] justify-between">
          <Button className="px-4 py-3 w-[164px]" onClick={applyFilters}>
            Áp dụng
          </Button>
          <Button className="px-4 py-3 w-[164px]" variant="outline" onClick={resetFilters}>
            Đặt lại
          </Button>
        </div>
      </div>
    );
  };
  
  export default Filter;


