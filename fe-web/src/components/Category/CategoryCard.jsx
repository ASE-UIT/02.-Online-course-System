const CategoryCard = ({ img, category, subcategory }) => {
  return (
    <div className=" border rounded-[4px] overflow-hidden cursor-pointer">
      <div className="content flex gap-4">
        <div className="overflow-hidden items-center text-center">
          <img
            src={img}
            alt="No image"
            className="mx-auto h-[100px] w-[100px]  object-cover transition duration-700 "
          />
        </div>
        <div className="title flex flex-col justify-center">
          <h1 className="line-clamp-2 font-bold text-text/md/bold">
            {category}
          </h1>
          <div className="subtcategory mt-2">
            <ul className="">
              {subcategory?.map((sub, index) => (
                <li
                  key={index}
                  className="text-text/sm/semibold text-black-300 "
                >
                  {sub}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
