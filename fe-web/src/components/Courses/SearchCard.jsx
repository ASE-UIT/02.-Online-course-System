
import StarIcon from "@/assets/StarIcon";
import { formatCurrency } from "@/utils/converter";
import { useNavigate } from "react-router-dom";

const SearchCard = ({searchedCourse}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/web/course/${searchedCourse.id}`);
  };
    return (
      <div onClick={handleCardClick} className="flex h-[80px] shadow-sm transition-all duration-500 hover:shadow-md dark:bg-slate-950 dark:text-white cursor-pointer border border-gray-300 rounded-xl">
        <div className="flex-shrink-0 overflow-hidden w-[25%] rounded-l-xl">
          <img
            src={searchedCourse.thumbnail}
            alt="No image"
            className="h-full w-full object-cover transition duration-700 hover:skew-x-2"
          />
        </div>
        <div className="flex justify-between p-4 w-[75%] space-y-2 items-center">
          <div>
            <h1 className="line-clamp-1 font-bold text-text/md/semibold">{searchedCourse.name}</h1>
            <div className="flex items-center gap-2 opacity-70">
              <span>{searchedCourse.averageRating}/5</span>
              <StarIcon />
            </div>
          </div>
          <div className="pt-3 mt-3">
                <p className="text-lg font-bold text-red-400">{formatCurrency(searchedCourse.sellPrice)}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default SearchCard;
  