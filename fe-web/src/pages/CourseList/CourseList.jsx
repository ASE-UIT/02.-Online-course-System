import {CourseCard} from "@/components/Courses/CourseCard";
import {useEffect, useState} from "react";
import {courseApi} from "@/api/courseApi";
import {CourseListCard} from "@/pages/CourseList/CourseListCard.jsx";
import {CourseLiveCard} from "@/pages/CourseList/CourseLiveCart.jsx";
import {useGetCoursesQuery} from "@/store/rtk/course.services.js";
import {useNavigate} from "react-router-dom";
import {CustomSkeletonDemo} from "@/pages/CourseList/CustomSkeleton.jsx";

const CourseList = () => {
    const [myCourses, setMyCourses] = useState([]);
    //const [liveCourses, setLiveCourses] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const getMyCourses = async () => {
        const response = await courseApi.getMyStudentCourses();
        if (response?.success) {
            setMyCourses(response.data);
            console.log(response.data);
        }
    };
    const {data: courseResponse} = useGetCoursesQuery({
        limit: 8,
        page: 1,
        isApproved: true,
    });
    const liveCourses = courseResponse?.data?.items ? courseResponse.data.items : [];
    useEffect(() => {
        getMyCourses().then(() => {
            setIsLoading(false);
        });
    }, []);
    if (isLoading) return <CustomSkeletonDemo/>;
    return (
        <div className="w-full flex flex-col space-y-5">
            <div className="w-full flex px-24 mt-5">
                <p className="text-display/md/bold text-black">Danh sách khóa học</p>
            </div>
            <section className="flex flex-col px-24 space-y-4">
                <div className="flex justify-between py-2.5">
                    <p className=" text-text/lg/bold">Đang học</p>
                    <p onClick={
                        () => {
                            navigate("/web/course-list/learning")
                        }
                    }
                       className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
                </div>
                <div className="grid grid-cols-4 gap-[1rem]">
                    {myCourses.slice(0, 8).map((course, idx) => {
                        return <CourseListCard key={idx} course={course}></CourseListCard>;
                    })}
                </div>
            </section>
            <section className="flex flex-col px-24 space-y-4">
                <div className="flex justify-between py-2.5">
                    <p className=" text-text/lg/bold">Đã học</p>
                    <p onClick={
                        () => {
                            navigate("/web/course-list/completed")
                        }
                    }
                       className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
                </div>
                <div className="grid grid-cols-4 gap-[1rem]">
                    {myCourses.slice(0, 8).map((course, idx) => {
                        return <CourseListCard key={idx} course={course}></CourseListCard>;
                    })}
                </div>
            </section>
            <section className="flex flex-col px-24 space-y-4">
                <div className="flex justify-between py-2.5">
                    <p className=" text-text/lg/bold">Đã thích</p>
                    <p
                        onClick={
                            () => {
                                navigate("/web/course-list/favorite")
                            }
                        }
                        className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
                </div>
                <div className="grid grid-cols-4 gap-[1rem]">
                    {liveCourses.slice(0, 8).map((course, idx) => {
                        return <CourseLiveCard key={idx} course={course}></CourseLiveCard>;
                    })}
                </div>
            </section>
            <section className="flex flex-col px-24 space-y-4">
                <div className="flex justify-between py-2.5">
                    <p className=" text-text/lg/bold">Khóa học đề xuất</p>
                    <p className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
                </div>
                <div className="grid grid-cols-4 gap-[1rem]">
                    {liveCourses.slice(0, 8).map((course, idx) => {
                        return <CourseLiveCard key={idx} course={course}></CourseLiveCard>;
                    })}
                </div>
            </section>
        </div>
    );
};

export default CourseList;
