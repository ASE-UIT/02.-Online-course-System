import React, {useState} from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { Button } from '@/components/ui/button';

function UserSection() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
      <div className='flex gap-2 md:gap-5 items-center'>
        <FaCartShopping className='text-xl md:text-2xl hover:cursor-pointer' />
        {isLoggedIn ? (
        
        <Button className="text-sm md:text-base">Profile</Button>
      ) : (
        <>
        <Button variant="loginOutline" className=" text-sm md:text-base w-[140px]">Đăng nhập</Button>
        <Button className="text-sm md:text-base w-[140px]">Đăng Ký</Button>
        </>
      )}
      </div>
    );
  }

export default UserSection