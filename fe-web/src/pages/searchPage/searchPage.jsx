import { useLocation } from "react-router-dom";
import { useSearchCoursesQuery } from "@/store/rtk/course.services";
import { useState, useCallback } from "react";
import Filter from "./Filter";
import { CourseCard } from "@/components/Courses/CourseCard";
import { skipToken } from "@reduxjs/toolkit/query";

const SearchPage = () => {
  const [filters, setFilters] = useState({});
  const location = useLocation();
  const [sortOrder, setSortOrder] = useState("DESC");
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");
  // console.log("Search Query:", searchQuery);

  // Build the filter query dynamically based on selected filters
  const buildFilterQuery = useCallback((filters, searchQuery) => {
    const filterQuery = [];

    // Always include the search query
    if (searchQuery) {
      filterQuery.push({
        match: { name: searchQuery },
      });
    }

    // Add price range filter
    if (Array.isArray(filters.price) && filters.price.length === 2) {
      const [minPrice, maxPrice] = filters.price;
      filterQuery.push({
        range: {
          sell_price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
      });
    }

    // Add difficulty level filters
    if (filters.levels?.length) {
      filters.levels.forEach((level) => {
        filterQuery.push({
          match: { difficultyLevel: level },
        });
      });
    }

    // Add category filter
    if (filters.category?.id) {
      filterQuery.push({
        match: { categoryId: filters.category.id },
      });
    }

    return filterQuery;
  }, []);

  // Search query with filters
  const {
    data: searchResults,
    isFetching,
    error,
  } = useSearchCoursesQuery(
    searchQuery
      ? {
          filter: buildFilterQuery(filters, searchQuery),
          sort: { key: "create_at", type: sortOrder },
          rpp: 10,
          page: 1,
        }
      : skipToken
  );

  const courses = searchResults?.hits?.hits?.map((hit) => hit._source) || [];

  const handleFilterChange = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  // useEffect(() => {
  //   if (isFetching) console.log("Fetching courses...");
  //   if (error) console.error("Error fetching courses:", error);
  //   if (searchResults) console.log("Search results:", searchResults);
  // }, [isFetching, error, searchResults]);
  return (
    <div className="flex ">
      <div className="py-5 px-20 w-full">
        <div className="header flex justify-between items-center">
          <label className="sm:text-display/sm/semibold md:text-display/md/semibold ">
            {courses.length} kết quả cho từ khoá &quot;{searchQuery}&quot;
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
            ) : searchResults?.hits?.total?.value === 0 ? (
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
