import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";
import { Combobox } from "./ComboBox";
import UserSection from "./UserSection";

const Header = () => {
  const location = useLocation();
  const [isLecturerLayout, setIsLecturerLayout] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/web/lecturer"))
      setIsLecturerLayout(true);
    else setIsLecturerLayout(false);
  }, [location]);

  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row fixed bg-white/95  left-0 right-0 top-0 items-center px-6 py-4 md:px-24 md:py-2 justify-between gap-4  z-[999]">
      <Link to={"./"} className="bg-no-repeat bg-contain bg-center">
        <img
          src="/web/picture/textLogo.png"
          alt="logo"
          className=" w-[108px] h-full"
        />
      </Link>

      {/* <Combobox /> */}

      <SearchBox />

      <Link to={isLecturerLayout ? "./" : "lecturer/landing"}>
        <h1 className="forMentor text-text/md/semibold whitespace-nowrap hover:cursor-pointer">
          {isLecturerLayout ? "Dành cho học viên" : "Dành cho giảng viên"}
        </h1>
      </Link>

      <UserSection />
    </div>
  );
};

export default Header;
