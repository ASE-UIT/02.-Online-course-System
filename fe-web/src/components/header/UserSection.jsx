import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

function UserSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 md:gap-5 items-center">
      <ShoppingCart className="text-xl md:text-2xl hover:cursor-pointer" />
      {isLoggedIn ? (
        <Button className="w-[24px] h-[24px]">Profile</Button>
      ) : (
        <>
          <Button
            type="button"
            onClick={() => navigate("/web/sign-in")}
            variant="loginOutline"
            className=" text-text/md/semibold text-primary-500 border-primary-500 border-[1px] md:text-base w-[140px]"
          >
            Đăng nhập
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/web/sign-up/step1/email")}
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
