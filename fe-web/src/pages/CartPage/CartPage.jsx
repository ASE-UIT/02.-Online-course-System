import { CourseCard } from "@/components/Courses/CourseCard";
import {CourseCartCard} from "@/pages/CartPage/CourseCartCard.jsx";

import { useEffect, useState } from "react";
import { courseApi, courseCartApi } from "@/api/courseApi";
import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox'
import {CheckIcon} from "lucide-react";
const mockCourseData = [
    {
        id: 1,
        name: "React for Beginners",
        price: 150000,
        rating: 4,
        numRatings: 100,
        author: "John Doe",
        image: "/picture/CourseCardIcon.svg"
    },
    {
        id: 2,
        name: "Advanced JavaScript",
        price: 200000,
        rating: 5,
        numRatings: 250,
        author: "Jane Smith",
        image: "/picture/CourseCardIcon.svg"
    },
    {
        id: 3,
        name: "Node.js and Express",
        price: 180000,
        rating: 4.5,
        numRatings: 150,
        author: "Mark Johnson",
        image: "/picture/CourseCardIcon.svg"
    },
    {
        id: 4,
        name: "CSS Mastery",
        price: 120000,
        rating: 4.8,
        numRatings: 90,
        author: "Emily Davis",
        image: "/picture/CourseCardIcon.svg"
    },
    {
        id: 5,
        name: "HTML and CSS Fundamentals",
        price: 100000,
        rating: 4.2,
        numRatings: 80,
        author: "Sarah Brown",
        image: "/picture/CourseCardIcon.svg"
    },
    {
        id: 6,
        name: "Full Stack Web Development",
        price: 250000,
        rating: 4.9,
        numRatings: 320,
        author: "Michael Lee",
        image: "/picture/CourseCardIcon.svg"
    },
    {
        id: 7,
        name: "Intro to Python Programming",
        price: 130000,
        rating: 4.4,
        numRatings: 110,
        author: "Olivia Taylor",
        image: "/picture/CourseCardIcon.svg"
    },
    {
        id: 8,
        name: "Java for Beginners",
        price: 170000,
        rating: 4.7,
        numRatings: 210,
        author: "Daniel Harris",
        image: "/picture/CourseCardIcon.svg"
    },
    {
        id: 9,
        name: "Web Design Principles",
        price: 140000,
        rating: 4.3,
        numRatings: 95,
        author: "Sophia Clark",
        image: "/picture/CourseCardIcon.svg"
    }
];

const CartPage = () => {
    const [myCart, setMyCart] = useState([]);
    const [cartResponse, setCartResponse] = useState(null);
    const getMyCart = async () => {
        try {
            const response = await courseCartApi.getMyCart();
            if (response?.success) {
                setMyCart(response.data.items);
                setCartResponse(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.log(error.response?.errors.msg);
        }
        
    };
    const [selectedCourses, setSelectedCourses] = useState([]);

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            setSelectedCourses(mockCourseData.map((course) => course.id));
        } else {
            setSelectedCourses([]);
        }
    };

    const handleSelectCourse = (courseId, isChecked) => {
        setSelectedCourses((prev) =>
            isChecked ? [...prev, courseId] : prev.filter((id) => id !== courseId)
        );
    };

    useEffect(() => {
        getMyCart();
    }, []);
    return (
        <div className="w-full flex flex-col space-y-5">
            <div className="w-full flex px-24 mt-5">
                <p className="text-display/md/bold text-black font-worksans">Giỏ hàng của bạn</p>
            </div>
            <div className="w-full flex px-24">
                <p className="text-text/lg/bold text-black font-worksans">Các Khóa học đã thêm</p>
            </div>

            <section className="flex flex-col px-24 space-y-5 ">
                <div className="flex items-center gap-5">
                    <Checkbox
                        checked={selectedCourses.length === mockCourseData.length}
                        onCheckedChange={(checked) => handleSelectAll(checked)}
                        className="h-6 w-6 rounded-[2px]"
                    >
                        <CheckIcon/>
                    </Checkbox>
                    <label className="cursor-pointer text-text/lg/medium font-worksans">
                        Chọn tất cả ({mockCourseData.length} sản phẩm)
                    </label>
                </div>
                <div className="space-y-5 grid grid-cols-1">
                    {myCart.map((course) => (
                        <CourseCartCard
                            key={course.courseId}
                            course={course}
                            checked={selectedCourses.includes(course.id)}
                            onChange={(checked) => handleSelectCourse(course.id, checked)}
                        />
                    ))}
                </div>
            </section>

            <section className="flex flex-col px-24 space-y-4">
                <div className="flex justify-between py-2.5">
                    <p className=" text-text/lg/bold font-worksans">Các Khóa học đã mua</p>
                    <p className="text-text/md/semibold text-primary-500 cursor-pointer font-worksans">Xem tất cả</p>
                </div>
                <div className="grid grid-cols-4 gap-[1rem]">
                    {mockCourseData.slice(0, 8).map((course, idx) => {
                        return <CourseCard key={idx} course={course}></CourseCard>;
                    })}
                </div>
            </section>
            <section className="flex flex-col px-24 space-y-4">
                <div className="flex justify-between py-2.5">
                    <p className=" text-text/lg/bold font-worksans">Khóa học đề xuất</p>
                    <p className="text-text/md/semibold text-primary-500 cursor-pointer font-worksans">Xem tất cả</p>
                </div>
                <div className="grid grid-cols-4 gap-[1rem]">
                    {mockCourseData.slice(0, 8).map((course, idx) => {
                        return <CourseCard key={idx} course={course}></CourseCard>;
                    })}
                </div>
            </section>
        </div>
    );
};
export default CartPage;