import React from 'react';
import SearchBox from './SearchBox';
import AdminSlider from './Slider';
import { Button } from '../ui/button';
import RatingSection from './RatingSection';
import RoleDropDown from './RoleDropDown';
import StatusDropDown from './StatusDropDown';

// manage = (category, lecturer, employee, company)
const Filter = ({ manage }) => {
    const placeholderMap = {
        category: 'Tìm kiếm danh mục',
        lecturer: 'Tìm kiếm giảng viên',
        employee: 'Tìm kiếm nhân viên',
        company: 'Tìm kiếm doanh nghiệp',
      };
      const placeholder = placeholderMap[manage] || 'Tìm kiếm';
  return (
    <div className="flex flex-col gap-5 justify-center items-center border w-[331px] p-5 rounded-[8px] shadow-lg">

      <SearchBox searchedContent={placeholder } />
      <div className="filter w-full text-left">
        <h1 className="text-text/md/semibold text-black">Bộ lọc</h1>
      </div>


      {manage === 'category' && <AdminSlider lable={'Số lượng khóa học'} />}
      {manage === 'lecturer' && (
        <>
          <AdminSlider lable={'Số lượng khóa học'} />
          <RatingSection />
        </>
      )}
      {manage === 'employee' && <RoleDropDown />}
      {manage === 'company' && <StatusDropDown />}


      <div className="buttons flex gap-5 w-full justify-between">
        <div className="apply py-2 px-[6px] w-[135px]">
          <Button className="w-full">Áp dụng</Button>
        </div>
        <div className="reset py-2 px-[6px] w-[135px]">
          <Button variant="outline" className="w-full">
            Đặt lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
