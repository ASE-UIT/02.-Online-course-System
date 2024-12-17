import {CourseCard} from "@/components/Courses/CourseCard";
import {CourseCartCard} from "@/pages/CartPage/CourseCartCard.jsx";

import {useEffect, useState} from "react";
import {courseApi, courseCartApi} from "@/api/courseApi";
import * as React from 'react';
import {Checkbox} from '@/components/ui/checkbox'
import {CheckIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator.jsx";
import {Button} from "@/components/ui/button.jsx";
import {formatCurrency} from "@/utils/converter";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addTotalPrice} from "@/store/slices/paymentSlice.js";
import {useToast} from "@/hooks/use-toast";
import {CustomSkeletonDemo} from "@/pages/CourseList/CustomSkeleton.jsx";
import {useGetCartQuery, useRemoveFromCartMutation} from "@/store/rtk/cart.services.js";
import useScrollToTop from "@/hooks/useScrollToTop.jsx";

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
    useScrollToTop()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {toast} = useToast();
    const [selectedCourses, setSelectedCourses] = useState([]);
    const {data: cartData, isLoading: isCartLoading} = useGetCartQuery();
    const [removeFromCart, {isLoading: isRemoveLoading}] = useRemoveFromCartMutation();
    const [totalPrice, setTotalPrice] = useState(0);
    const myCart = cartData?.data.items || [];

    useEffect(() => {
        if (cartData) {
            const newTotalPrice = cartData.data.items.reduce((sum, course) => {
                return sum + (course.course ? Number(course.course.sellPrice) : 0);
            }, 0);
            setTotalPrice(newTotalPrice);
        }
    }, [cartData]);

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            setSelectedCourses(cartData.data.items.map((course) => course.courseId));
        } else {
            setSelectedCourses([]);
        }
    };

    const handleSelectCourse = (courseId, isChecked) => {
        setSelectedCourses((prev) =>
            isChecked ? [...prev, courseId] : prev.filter((id) => id !== courseId)
        );
    };

    const handleClickPayment = () => {
        if (cartData.data.items.length > 0) {
            dispatch(addTotalPrice({totalPrice: totalPrice}));
            navigate("/web/checkout");
        } else {
            toast({
                title: <p className="text-error-500">Giỏ hàng không có khóa học</p>,
                status: "success",
                duration: 2000
            });
        }
    };

    const handleRemoveSelectedCourses = async () => {
        if (selectedCourses.length > 0) {
            try {
                const promises = selectedCourses.map(courseId => removeFromCart(courseId));
                await Promise.all(promises);
                toast({
                    title: <p className="text-success">Xóa khóa học khỏi giỏ hàng thành công</p>,
                    status: "success",
                    duration: 2000
                });
                setSelectedCourses([])
                console.log(selectedCourses)
            } catch (error) {
                console.error(error);
            }
        } else {
            if (myCart.length > 0) {
                toast({
                    title: <p className="text-warning-500">Không có khóa học được chọn</p>,
                    status: "warning",
                    duration: 2000
                });
            } else {
                toast({
                    title: <p className="text-warning-500">Không có khóa học nào trong giỏ hàng</p>,
                    status: "warning",
                    duration: 2000
                });
            }

        }
    };
    const handleRemoveFromCart = async (courseId) => {
        await removeFromCart(courseId);
        setSelectedCourses((prev) => prev.filter((id) => id !== courseId));
        toast({
            title: <p className="text-success">Xóa khóa học khỏi giỏ hàng thành công</p>,
            status: "success",
            duration: 2000
        });
    }
    if (isCartLoading) return <CustomSkeletonDemo/>;
    return (
        <div className="w-full flex flex-col space-y-5">
            <div className="w-full px-24 mt-5">
                <p className="text-display/md/bold text-black font-worksans">Giỏ hàng của bạn</p>
            </div>
            <section>
                <div className="flex px-24 gap-x-10">
                    <div className="flex flex-col space-y-5 w-2/3">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-5">
                                <Checkbox
                                    id="checkAll"
                                    checked={selectedCourses.length === myCart.length}
                                    onCheckedChange={(checked) => handleSelectAll(checked)}
                                    className="h-6 w-6 rounded-[2px]"
                                >
                                    <CheckIcon/>
                                </Checkbox>
                                <label htmlFor={`checkAll`}
                                       className="cursor-pointer text-text/lg/medium font-worksans">
                                    Chọn tất cả ({myCart.length} sản phẩm)
                                </label>
                            </div>
                            <p onClick={handleRemoveSelectedCourses}
                               className="text-text/lg/medium text-error-500 font-worksans cursor-pointer">Xóa
                                mục đã chọn</p>
                        </div>

                        <div className="space-y-5 grid grid-cols-1">
                            {myCart.map((course) => (
                                <CourseCartCard
                                    key={course.courseId}
                                    course={course.course}
                                    checked={selectedCourses.includes(course.courseId)}
                                    onChange={(checked) => handleSelectCourse(course.courseId, checked)}
                                    onRemove={() => handleRemoveFromCart(course.courseId)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 w-1/3">
                        <p className="text-text/lg/semibold text-black font-worksans">
                            Thông tin đơn hàng
                        </p>
                        <div className="flex justify-between">
                            <p className="text-text/md/medium text-black font-worksans">
                                Tạm tính ({myCart.length} sản phẩm)
                            </p>
                            <p className="text-text/md/medium text-black font-worksans">
                                đ{formatCurrency(totalPrice)}
                            </p>
                        </div>
                        <Separator className="bg-gray-500 h-[1px]"/>
                        <div className="flex justify-between">
                            <p className="text-text/md/medium text-black font-worksans">
                                Tổng cộng
                            </p>
                            <p className="text-display/sm/semibold text-primary-500 font-worksans">
                                đ{formatCurrency(totalPrice)}
                            </p>
                        </div>
                        <Button onClick={() => handleClickPayment()} className="py-3 px-4 rounded-[8px] w-full h-[48]">Thanh
                            toán</Button>

                    </div>
                </div>


            </section>

            <section className="flex flex-col px-24 space-y-4">
                <div className="flex justify-between py-2.5">
                    <p className=" text-display/md/bold text-black-500 font-worksans">Có thể bạn quan tâm</p>
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