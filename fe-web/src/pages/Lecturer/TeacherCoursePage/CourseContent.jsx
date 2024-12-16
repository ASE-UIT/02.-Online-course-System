import React, { useState } from "react";

import CommentIcon from "@/assets/CommentIcon";
import GroupIcon from "@/assets/GroupIcon";
import StarIcon from "@/assets/StarIcon";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import CourseCardIcon from "/picture/CourseCardIcon.svg";
import { useGetCoursesByLecturerIdQuery } from "@/store/rtk/course.services";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const CourseContent = () => {
  const { lecturerInfor } = useSelector((state) => state.lecturerInfor);
  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 100;
  const navigate = useNavigate();

  const {
    data: courseData,
    isLoading,
    error
  } = useGetCoursesByLecturerIdQuery({
    lecturerId: lecturerInfor?.id,
    limit: pageSize,
    page
  });

  if (isLoading) return <p>Loading courses...</p>;
  if (error) return <p>Error fetching courses.</p>;

  const courses = courseData?.data?.items || [];
  const totalCourses = courseData?.data?.totalCount || 0;
  const totalPages = Math.ceil(totalCourses / pageSize);
  console.log("cou", courses);

  const handleSendToApprove = (courseId) => {
    navigate(`${courseId}`);
  };
  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="mx-[80px] rounded-t-[12px] flex flex-col gap-[10px] border border-gray-500">
      <div className="title flex bg-primary-50 py-[8px] px-[20px] gap-[10px] justify-between items-center h-[64px] border rounded-t-[12px]">
        <p className="text-text/lg/medium">Bài giảng của tôi</p>
        <Link to={"/web/lecturer/courseAdd"}>
          <Button className="flex gap-[8px]">
            <Plus /> <span className="text-md/medium">Thêm khóa học</span>
          </Button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-b-lg shadow-md px-[20px] h-[724px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 h-[38px] border-t">
            <tr>
              <th className="text-text/md/semibold py-[7px] px-[8px] text-left w-[210px]">
                Ảnh
              </th>
              <th className="text-text/md/semibold py-[7px] px-[8px] text-left w-[400px]">
                Khóa học
              </th>
              <th className="text-text/md/semibold py-[7px] px-[8px] text-left w-[210px]">
                Trạng thái
              </th>
              <th className="text-text/md/semibold py-[7px] px-[8px] text-left w-[210px]">
                Giá
              </th>
              <th className="text-text/md/semibold py-[7px] px-[8px] text-left w-[210px]">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((item, index) => (
              <tr key={item.id}>
                <td className="px-[8px] py-[7px] whitespace-nowrap border-t w-[210px]">
                  <img
                    src={item.thumbnail || CourseCardIcon}
                    alt={`Course thumbnail for ${item.name}`}
                    className="h-[81px] w-[194px] object-cover"
                  />
                </td>
                <td className="border-t w-[400px]">
                  <div className="flex flex-col py-[7px] px-[8px] gap-[10px]">
                    <p className="text-text/md/regular text-black">
                      {item.name}
                    </p>
                    <div className="flex gap-[10px]">
                      <div className="flex gap-[4px] items-center">
                        <GroupIcon className="w-4 h-4" />
                        <p className="text-text/sm/regular">
                          {item.totalStudents} học viên
                        </p>
                      </div>
                      <div className="flex gap-[4px] items-center">
                        <StarIcon className="w-4 h-4 bg-warning-500" />
                        <p className="text-text/sm/regular">
                          {item.averageRating} ({item.totalReviews})
                        </p>
                      </div>
                      <div className="flex gap-[4px] items-center">
                        <CommentIcon className="w-4 h-4" />
                        <p className="text-text/sm/regular">
                          {item.totalReviews} thảo luận
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-t w-[210px] pl-2 text-text/md/regular">
                  {item.isApproved ? (
                    <p className="text-green-500">Đã duyệt</p>
                  ) : (
                    <p className="text-red-600">Chờ duyệt</p>
                  )}
                </td>
                <td className="border-t w-[210px] text-text/md/regular">
                  <div className="flex flex-col">
                    <p className="font-semibold">{item.sellPrice || "0đ"}</p>
                    <p className="line-through">
                      {item.originalPrice || "10đ"}
                    </p>
                  </div>
                </td>
                <td className="border-t w-[210px] flex gap-[8px] py-[7px] px-[8px]">
                  <Button
                    variant="loginOutline"
                    className="text-text/md/semibold text-primary-500 border-primary-500 border-[1px] py-[8px] px-[12px] w-[93px]"
                    onClick={() => handleSendToApprove(item.id)}
                  >
                    Quản lý
                  </Button>
                  {item.status === "WAITING_FOR_APPROVAL" && (
                    <Button className="py-[8px] px-[12px] w-[93px]">
                      Gửi duyệt
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center py-[10px] px-[20px] border-t border-gray-200">
        <Button
          onClick={goToPreviousPage}
          disabled={page <= 1}
          className="flex items-center gap-[8px] disabled:opacity-50"
        >
          <ChevronLeft /> <span className="text-sm">Trước</span>
        </Button>
        <p className="text-sm">
          Trang {page} trên {totalPages + 1}
        </p>
        <Button
          onClick={goToNextPage}
          disabled={page >= totalPages}
          className="flex items-center gap-[8px] disabled:opacity-50"
        >
          <span className="text-sm">Sau</span> <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
