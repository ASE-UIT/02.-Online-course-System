
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SearchBox({searchedContent}) {
const [searchQuery, setSearchQuery] = useState("");
const [searchedCourse, setSearchedCourse] = useState([]);
const navigate = useNavigate();

  return (
      <div className="w-full md:w-[291px] px-1 py-2  h-[40px] flex items-center relative border-b ">
        <div className="w-[16px] h-[16px] flex items-center justify-center text-gray-700 hover:text-gray-600 cursor-pointer transition-all hover:bg-gray-200">
          <Search />
        </div>
        <input
        type="text"
        placeholder={searchedContent}
        className="w-full bg-transparent outline-none px-6 py-3 placeholder-gray-700"
        // value={searchQuery}
        // onChange={(e) => {
        //     setSearchQuery(e.target.value);
        //     setIsSearching(true);
        // }}
        // onKeyDown={(e) => {
        //     if (e.key === 'Enter') {
        //     handleSearchSubmit(); 
        //     }
        // }}
        />

      </div>
  );
}
