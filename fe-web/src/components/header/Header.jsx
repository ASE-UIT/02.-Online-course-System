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
    <div className="flex flex-col md:flex-row fixed bg-white/95  left-0 right-0 top-0 items-center px-6 md:px-24 justify-between gap-4 py-4 md:py-0  z-[10]">
      <Link
        to={"./"}
        style={{
          backgroundImage: `url('/web/picture/textLogo.png')`
        }}
        className="h-[40px] w-[100px] md:h-[60px] md:w-[120px] bg-no-repeat bg-contain bg-center"
      ></Link>

      <Combobox />

      <SearchBox />

      <Link to={"lecturer/sign-up"}>
        <h1 className="forMentor text-text/md/semibold whitespace-nowrap hover:cursor-pointer">
          {isLecturerLayout ? "Dành cho doanh nghiệp" : "Dành cho giảng viên"}
        </h1>
      </Link>

      <UserSection />
    </div>
  );
};

export default Header;
