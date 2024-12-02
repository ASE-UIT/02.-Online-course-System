import { useLocation } from "react-router-dom";
import { useSearchCoursesQuery } from "@/store/rtk/course.services";
import { useState, useCallback, useEffect } from "react";
import Filter from "./Filter"; 
import { CourseCard } from "@/components/Courses/CourseCard";
import { ChevronDown } from "lucide-react";

const SearchPage = () => {
  const [filters, setFilters] = useState({});
  const location = useLocation();
  const [sortOrder, setSortOrder] = useState("DESC"); 
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");
  const levelMapping = {
    1: "easy",
    2: "medium",
    3: "hard",
  };
  // Build the filter query dynamically based on selected filters
  const buildFilterQuery = useCallback((filters) => {
    const filterQuery = [];

    // if (filters.ratings && filters.ratings.length > 0) {
    //   filters.ratings.forEach((rating) => {
    //     filterQuery.push({
    //       operator: "gte",
    //       key: "averageRating",
    //       value: rating,
    //     });
    //   });
    // }

    if (filters.levels && filters.levels.length > 0) {
      filters.levels.forEach((level) => {
        const levelString = levelMapping[level]; // Map the level number to its string value
        if (levelString) {
          filterQuery.push({
            operator: "equal",
            key: "difficultyLevel",
            value: levelString, // Use the string value (easy, medium, hard)
          });
        }
      });
    }

    if (filters.lengths && filters.lengths.length > 0) {
      filters.lengths.forEach(({ min, max }) => {
        filterQuery.push({
          operator: "range",
          key: "duration",
          value: `${min}-${max}`,
        });
      });
    }

    if (filters.price && filters.price.length === 2) {
      const [minPrice, maxPrice] = filters.price;
      filterQuery.push({
        operator: "range",
        key: "originalPrice",
        value: `${minPrice}-${maxPrice}`, // Ensure the range is in the format "minPrice-maxPrice"
      });
    }
    if (filters.category?.id) {
      filterQuery.push({
        operator: "equal",
        key: "categoryId",
        value: filters.category.id,
      });
    }
    return filterQuery;
  }, []);
 

  // Search query with filters
 const { data: searchResults, isFetching, error } = useSearchCoursesQuery({
  filter: [
    { operator: "like", key: "name", value: searchQuery },
    ...buildFilterQuery(filters), 
  ],
  sort: { key: "originalPrice", type: "DESC" },
  rpp: 10, 
  page: 1,
});

  const courses = Array.isArray(searchResults?.data) ? searchResults.data : [];

  const handleFilterChange = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value); 
  };

  console.log('filter',filters);
 
  return (
    <div className="flex ">
      <div className='py-5 px-20 w-full'>
        <div className="header flex justify-between items-center">
          <label className='sm:text-display/sm/semibold md:text-display/md/semibold '>
            {courses.length} kết quả cho từ khoá "{searchQuery}"
          </label>
          <div className="sort border rounded-[8px] w-[230px]">
            <div
              className="flex gap-[20px] justify-between py-[10px] px-[20px] items-center cursor-pointer w-full"
              onClick={handleSortChange} // Toggle sort order when clicked
            >
              <div className="text flex flex-col gap-2 w-full">
                <p className="text-text/xs/semibold">Sắp xếp theo</p>
                <select
                  value={sortOrder}
                  onChange={handleSortChange} // Update sort order on change
                  className="text-text/md/regular w-full bg-transparent"
                >
                  <option value="DESC">Giá cao đến thấp</option>
                  <option value="ASC">Giá thấp đến cao</option>
                </select>
              </div>
            </div>
          </div>

        </div>
        <div className="body flex flex-col sm:flex-row gap-[20px] sm:justify-between">
          <div className="filter sm:w-full md:w-[300px] lg:w-[376px]">
            <Filter onFilterChange={handleFilterChange} />
          </div>
          <div className="content flex-1 sm:w-full">
            {isFetching ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error fetching courses</p>
            ) : courses.length === 0 ? (
              <p className="text-center text-text/lg/semibold mt-8">No courses available</p>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-4 gap-x-[36px] gap-y-[16px]">
                {courses.map((course, idx) => (
                  <CourseCard key={idx} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>



      </div>
    </div>
  );
};

export default SearchPage;
