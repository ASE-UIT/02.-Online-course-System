import React from 'react';
import SearchBox from './SearchBox';
import AdminSlider from './Slider';
import { Button } from '../ui/button';
import RatingSection from './RatingSection';
import RoleDropDown from './RoleDropDown';
import StatusDropDown from './StatusDropDown';
import DatePicker from './DatePicker';

// manage = (category, lecturer, employee, company)
const Filter = ({ manage }) => {
  const renderSearchBoxes = () => {
    switch (manage) {
      case 'category':
        return (
          <>
            <SearchBox searchedContent="Tìm kiếm danh mục (tên)" />
            <SearchBox searchedContent="Tìm kiếm danh mục (mã)" />
          </>
        );
      case 'lecturer':
        return (
          <>
            <SearchBox searchedContent="Tìm kiếm giảng viên (tên)" />
            <SearchBox searchedContent="Tìm kiếm giảng viên (mã)" />
            <SearchBox searchedContent="Tìm kiếm giảng viên (email)" />
            <SearchBox searchedContent="Tìm kiếm giảng viên (SDT)" />
          </>
        );
      case 'employee':
        return (
          <>
          <SearchBox searchedContent="Tìm kiếm nhân viên" />
          </>
        );
        case 'company':
          return (
            <>
            <SearchBox searchedContent="Tìm kiếm doanh nghiệp" />
            </>
        );
        case 'application':
          return (
            <>
            <SearchBox searchedContent="Tìm kiếm đơn đăng ký" />
            </>
        );
      default:
        return <SearchBox searchedContent="Tìm kiếm" />;
    }
  };
  return (
    <div className="flex flex-col gap-5 justify-center items-center border w-[331px] p-5 rounded-[8px] shadow-lg">

      {renderSearchBoxes()}
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
      {manage === 'application' && <DatePicker />}

      {manage === 'employee' && <RoleDropDown />}
      {manage === 'company' || 'application' && <StatusDropDown />}


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
