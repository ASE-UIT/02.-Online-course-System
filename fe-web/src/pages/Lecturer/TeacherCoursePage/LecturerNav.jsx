import { Button, buttonVariants } from '@/components/ui/button';
import React, { useState } from 'react';

const LecturerNav = () => {
  const [activeButton, setActiveButton] = useState('lectures');
  const navItems = [
    { label: 'Bài giảng', id: 'lectures' },
    { label: 'Học viên', id: 'students' },
    { label: 'Coupon', id: 'coupon' },
    { label: 'Đơn hàng', id: 'orders' },
    { label: 'Thu nhập', id: 'income' },
    { label: 'Hồ sơ', id: 'profile' },
  ];

  return (
    <div className="px-[80px]">
        <nav className="flex gap-[4px] space-x-4 bg-white p-4text/md/medium">
        {navItems.map((item) => (
            <Button
                key={item.id}
                onClick={() => setActiveButton(item.id)}
                className={`${buttonVariants({
                variant: 'whiteButton',
                size: 'default'
                })} ${
                activeButton === item.id
                    ? 'bg-primary text-white'  // Active button styling
                    : 'text-black'
                } hover:bg-primary hover:text-white`}
            >
                {item.label}
            </Button>
        ))}
        </nav>
    </div>
  );
};

export default LecturerNav;
