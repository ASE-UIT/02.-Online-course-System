import CommentIcon from '@/assets/CommentIcon'
import GroupIcon from '@/assets/GroupIcon'
import StarIcon from '@/assets/StarIcon'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import CourseCardIcon from "/picture/CourseCardIcon.svg";

export const CourseContent = () => {
    const fakeData = Array(6).fill({
        image: CourseCardIcon,
        courseName: "Khoá học test",
        studentCount: 0,
        rating: 0,
        comments: 0,
        currentPrice: "0đ",
        originalPrice: "10đ",
      });
  return (
    <div className='mx-[80px] rounded-t-[12px] flex flex-col gap-[10px] border border-gray-500'>
        <div className="title flex bg-primary-50 py-[8px] px-[20px] gap-[10px] justify-between items-center h-[64px] border rounded-t-[12px]">
            <p className='text-text/lg/medium'>Bài giảng của tôi</p>
            <Button className="flex gap-[8px]">
                <Plus/> <span className='text/md/medium'>Thêm khóa học</span>
            </Button>
        </div>
         {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-b-lg shadow-md px-[20px] h-[724px]">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-100 h-[38px] border-t">
            <tr className=''>
              <th className="text-text/md/semibold py-[7px] px-[8px] text-left w-[210px]">Ảnh</th>
              <th className="text-text/md/semibold py-[7px] px-[8px] text-left w-[400px]">Khóa học</th>
              <th className="text-text/md/semibold py-[7px] px-[8px] text-left w-[210px]">Trạng thái</th>
              <th className="text-text/md/semibold py-[7px] px-[8px] text-left w-[210px]">Giá</th>
              <th className="text-text/md/semibold py-[7px] px-[8px] text-left w-[210px]">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fakeData.map((item, index) => (
                <tr key={index}>
                <td className="px-[8px] py-[7px] whitespace-nowrap border-t w-[210px]">
                    <img src={item.image} alt="Course Image" className="h-[81px] w-[194px] object-cover" />
                </td>
                <td className="border-t w-[400px]">
                    <div className="flex flex-col py-[7px] px-[8px] gap-[10px]">
                    <p className='text-text/md/regular text-black'>{item.courseName}</p>
                    <div className="flex gap-[10px]">
                        <div className="flex gap-[4px] items-center">
                        <GroupIcon className="w-4 h-4" />
                        <p className='text-text/sm/regular'>{item.studentCount} học viên</p>
                        </div>
                        <div className="flex gap-[4px] items-center">
                        <StarIcon className="w-4 h-4 bg-warning-500" />
                        <p className='text-text/sm/regular'>{item.rating} ({item.rating})</p>
                        </div>
                        <div className="flex gap-[4px] items-center">
                        <CommentIcon className="w-4 h-4" />
                        <p className='text-text/sm/regular'>{item.comments} thảo luận</p>
                        </div>
                    </div>
                    </div>
                </td>
                <td className="border-t w-[210px] text-text/md/regular">Khóa học mới</td>
                <td className="border-t w-[210px] text-text/md/regular">
                    <div className="flex flex-col">
                    <p className='font-semibold'>{item.currentPrice}</p>
                    <p className='line-through'>{item.originalPrice}</p>
                    </div>
                </td>
                <td className="border-t w-[210px] flex gap-[8px] py-[7px] px-[8px]">
                    <Button className="py-[8px] px-[12px] w-[93px]">Vào học</Button>
                    <Button variant="loginOutline" className="text-text/md/semibold text-primary-500 border-primary-500 border-[1px] py-[8px] px-[12px] w-[93px]">Quản lý</Button>
                </td>
                </tr>
            ))}
            </tbody>
            

        </table>
      </div>
    </div>
  )
}
