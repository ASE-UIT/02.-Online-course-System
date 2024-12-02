import useDebounce from "@/hooks/useDebouce";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchCard from "../Courses/SearchCard";
import { useSearchCoursesQuery } from "@/store/rtk/course.services";

export default function SearchBox() {
const [searchQuery, setSearchQuery] = useState("");
const [isSearching, setIsSearching] = useState(false);
const debounceSearch = useDebounce(searchQuery, 500);
const searchBoxRef = useRef(null);
const [searchedCourse, setSearchedCourse] = useState([]);
const navigate = useNavigate();
// const normalizedSearchQuery = debounceSearch.toLowerCase();

const { data: searchResults, isFetching, error } = useSearchCoursesQuery(
  {
    filter: debounceSearch
      ? [
          {
            operator: "like",
            key: "name",
            value: debounceSearch,
          },
        ]
      : [], // No filter if searchQuery is empty
    sort: { key: "originalPrice", type: "DESC" },
    rpp: 5,
    page: 1,
  },
  {
    skip: !debounceSearch, // Skip the request if searchQuery is empty
  }
);

useEffect(() => {
  if (searchResults && searchResults.data) {
    setSearchedCourse(searchResults.data);
  } else {
    // No results found, set empty array and show "No results" message
    setSearchedCourse([]);
  }
}, [searchResults]);

// Close search results dropdown on outside click
useEffect(() => {
  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setIsSearching(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
useEffect(() => {
  if (searchResults && searchResults.data) {
    console.log("Search results:", searchResults.data);
    setSearchedCourse(searchResults.data);
  } else {
    setSearchedCourse([]);
  }
}, [searchResults]);

// Navigate to search results page
const handleSearchSubmit = () => {
  if (searchQuery.trim()) {
    navigate(
      `../web/search?query=${encodeURIComponent(searchQuery)}`
    );
  }
};
  return (
    <div ref={searchBoxRef} className="w-[400px] relative">
      <div className="w-full md:w-[500px] bg-gray-50 rounded-full h-[45px] flex items-center relative border ">
        <input
            type="text"
            placeholder="Tìm kiếm khóa học, giảng viên..."
            className="w-full bg-transparent outline-none px-6 py-3"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearching(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit(); // Submit on Enter key press
              }
            }}
          />
        <div className="w-[50px] md:w-[60px] flex items-center justify-center h-full text-gray-500 hover:text-gray-600 rounded-r-full rounded-br-full cursor-pointer transition-all hover:bg-gray-200">
          <Search />
        </div>
      </div>
      {isSearching && (
        <div className="absolute top-[60px] bg-white shadow-lg rounded-lg p-4 max-h-[300px] flex flex-col gap-3 overflow-y-auto w-[500px]">
          {isFetching ? (
            <p className="text-gray-500 text-center">Đang tìm kiếm...</p>
          ) : searchedCourse.length > 0 ? (
            searchedCourse.map((course, idx) => (
              <SearchCard key={idx} searchedCourse={course} />
            ))
          ) : (
            <p className="text-gray-500 text-center">Không tìm thấy kết quả</p>
          )}
        </div>
      )}
    </div>
  );
}
