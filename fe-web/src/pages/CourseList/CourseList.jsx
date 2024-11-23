import CategoryCard from "@/components/Category/CategoryCard";
import { CourseCard } from "@/components/Courses/CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HomeIcon } from "@/assets";

import { useEffect, useState } from "react";
import { courseApi } from "@/api/courseApi";
import CourseCardIcon from "/picture/CourseCardIcon.svg";
const CourseList = () => {
    const [liveCourses, setLiveCourses] = useState([]);
    const getLiveCourses = async () => {
        const response = await courseApi.getLiveCourses();
        if (response?.success) {
            setLiveCourses(response.data);
        }
    };
    useEffect(() => {
        getLiveCourses();
    }, []);
    return (
        <div className="w-full flex flex-col space-y-5">
            <div className="w-full flex px-24 mt-5">
                <p className="text-display/md/bold text-black">Danh sách khóa học</p>
            </div>
            <section className="flex flex-col px-24 space-y-4">
                <div className="flex justify-between py-2.5">
                    <p className=" text-text/lg/bold">Đang học</p>
                    <p className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
                </div>
                <div className="grid grid-cols-4 gap-[1rem]">
                    {liveCourses.slice(0,8).map((course, idx) => {
                        return <CourseCard key={idx} course={course}></CourseCard>;
                    })}
                </div>
            </section>
            <section className="flex flex-col px-24 space-y-4">
                <div className="flex justify-between py-2.5">
                    <p className=" text-text/lg/bold">Đã học</p>
                    <p className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
                </div>
                <div className="grid grid-cols-4 gap-[1rem]">
                    {liveCourses.slice(0,8).map((course, idx) => {
                        return <CourseCard key={idx} course={course}></CourseCard>;
                    })}
                </div>
            </section>
            <section className="flex flex-col px-24 space-y-4">
                <div className="flex justify-between py-2.5">
                    <p className=" text-text/lg/bold">Khóa học đề xuất</p>
                    <p className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
                </div>
                <div className="grid grid-cols-4 gap-[1rem]">
                    {liveCourses.slice(0,8).map((course, idx) => {
                        return <CourseCard key={idx} course={course}></CourseCard>;
                    })}
                </div>
            </section>
        </div>
    );
};

export default CourseList;
