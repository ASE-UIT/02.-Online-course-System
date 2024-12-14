import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { List, LogOut, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";

function UserSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  const [isLecturerLayout, setIsLecturerLayout] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/web/lecturer"))
      setIsLecturerLayout(true);
    else setIsLecturerLayout(false);
  }, [location]);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth && auth.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("auth");
  };

  const handleLoginOnClick = () => {
    navigate(isLecturerLayout ? "/web/lecturer/sign-in" : "/web/sign-in");
  };

  const handleSignUpOnClick = () => {
    navigate(
      isLecturerLayout ? "/web/lecturer/sign-up" : "/web/sign-up/step1/email"
    );
  };

  return (
    <div className="flex gap-2 md:gap-5 items-center">
      {/* <Link to={"./cart"}>
        <ShoppingCart className="text-xl md:text-2xl hover:cursor-pointer" />
      </Link>{" "} */}
      {isLoggedIn ? (
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer">
            <div className="flex justify-center items-center">
              <span className="text-white font-semibold w-[40px] h-10 text-center"></span>
            </div>
          </div>

          {open && (
            <div className="w-[240px] before:w-[120px] before:h-[20px] border  before:absolute before:top-[-20px] before:right-[50%] before:translate-x-[50%]  mt-[5px] bg-white shadow-md rounded-sm right-[50%] translate-x-[50%] top-[100%] absolute">
              <Link to={"./profile"}>
                <div className="flex justify-between px-4 transition-all rounded-t-md cursor-pointer hover:bg-primary-50 gap-1 items-center py-2 hover:shadow-xl">
                  <p className="text-text/md/normal">Hồ sơ tài khoản</p>
                  <User className="text-lg"></User>
                </div>
              </Link>
              <Link to={"/web/course-list"}>
                <div className="flex justify-between px-4 transition-all rounded-t-md cursor-pointer hover:bg-primary-50 gap-1 items-center py-2 hover:shadow-xl">
                  <p className="text-text/md/normal">Danh sách khóa học</p>
                  <List className="text-lg"></List>
                </div>
              </Link>
              <Link to={"/web/cart"}>
                <div className="flex justify-between px-4 transition-all rounded-t-md cursor-pointer hover:bg-primary-50 gap-1 items-center py-2 hover:shadow-xl">
                  <p className="text-text/md/normal">Giỏ hàng của bạn</p>
                  <ShoppingCart className="text-lg"></ShoppingCart>
                </div>
              </Link>
              <div
                onClick={() => {
                  handleLogout();
                }}
                className="flex justify-between px-4 transition-all rounded-t-md cursor-pointer hover:bg-primary-50 gap-1 items-center py-2 hover:shadow-xl"
              >
                <p className="text-text/md/normal">Đăng xuất</p>
                <LogOut className="text-lg"></LogOut>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <Button
            type="button"
            onClick={handleLoginOnClick}
            variant="loginOutline"
            className=" text-text/md/semibold text-primary-500 border-primary-500 border-[1px] md:text-base w-[140px]"
          >
            Đăng nhập
          </Button>
          <Button
            type="button"
            onClick={handleSignUpOnClick}
            className="text-text/md/semibold text-white md:text-base w-[140px]"
          >
            Đăng Ký
          </Button>
        </>
      )}
    </div>
  );
}

export default UserSection;
