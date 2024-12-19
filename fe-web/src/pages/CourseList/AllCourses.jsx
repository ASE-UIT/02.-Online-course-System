import {useEffect, useState} from "react";
import {courseApi} from "@/api/courseApi";
import {CourseListCard} from "@/pages/CourseList/CourseListCard.jsx";
import {CourseLiveCard} from "@/pages/CourseList/CourseLiveCart.jsx";
import {useGetCoursesQuery} from "@/store/rtk/course.services.js";
import {useParams} from "react-router-dom";
import {useScrollToTop} from "@/hooks/index.js";
import {CustomSkeletonDemo} from "@/pages/CourseList/CustomSkeleton.jsx";
import {useGetCompletedEnrollmentQuery, useGetInProgressEnrollmentQuery} from "@/store/rtk/cart.services.js";
import {CompletedCourseListCard} from "@/pages/CourseList/CompletedCourseListCard.jsx";

const AllCoursesPage = () => {
    //const [liveCourses, setLiveCourses] = useState([]);
    const {content} = useParams();
    useScrollToTop();
    if (content === "learning") {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {data: myInProgressEnrollmentsResponse, isLoading: isGetLoading} = useGetInProgressEnrollmentQuery()
        const myInProgressEnrollments = myInProgressEnrollmentsResponse?.data ? myInProgressEnrollmentsResponse.data : [];

        if (isGetLoading) return <CustomSkeletonDemo/>;

        return (
            <div className="w-full flex flex-col space-y-5">
                <div className="w-full flex px-24 mt-5">
                    <p className="text-display/md/bold text-black">Danh sách khóa học</p>
                </div>
                <section className="flex flex-col px-24 space-y-4">
                    <div className="flex justify-between py-2.5">
                        <p className=" text-text/lg/bold">Đang học</p>
                    </div>
                    <div className="grid grid-cols-4 gap-[1rem]">
                        {myInProgressEnrollments.slice(0, 8).map((course, idx) => {
                            return <CourseListCard key={idx} course={course}></CourseListCard>;
                        })}
                    </div>
                </section>
            </div>
        );
    } else if (content === "completed") {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {data: myCompletedEnrollmentsResponse, isLoading: isGetLoading} = useGetCompletedEnrollmentQuery();
        const myCompletedEnrollments = myCompletedEnrollmentsResponse?.data ? myCompletedEnrollmentsResponse.data : [];
        if (isGetLoading) return <CustomSkeletonDemo/>;

        return (
            <div className="w-full flex flex-col space-y-5">
                <div className="w-full flex px-24 mt-5">
                    <p className="text-display/md/bold text-black">Danh sách khóa học</p>
                </div>
                <section className="flex flex-col px-24 space-y-4">
                    <div className="flex justify-between py-2.5">
                        <p className=" text-text/lg/bold">Đã học</p>
                    </div>
                    <div className="grid grid-cols-4 gap-[1rem]">
                        {myCompletedEnrollments.slice(0, 8).map((course, idx) => {
                            return <CompletedCourseListCard key={idx} course={course}></CompletedCourseListCard>;
                        })}
                    </div>
                </section>
            </div>
        );
    } else if (content === "favorite") {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {data: courseResponse, isLoading} = useGetCoursesQuery({
            limit: 8,
            page: 1,
            isApproved: true,
        });

        if (isLoading) return <CustomSkeletonDemo/>;
        const liveCourses = courseResponse?.data?.items ? courseResponse.data.items : [];

        return (
            <div className="w-full flex flex-col space-y-5">
                <div className="w-full flex px-24 mt-5">
                    <p className="text-display/md/bold text-black">Danh sách khóa học</p>
                </div>
                <section className="flex flex-col px-24 space-y-4">
                    <div className="flex justify-between py-2.5">
                        <p className=" text-text/lg/bold">Đã thích</p>
                    </div>
                    <div className="grid grid-cols-4 gap-[1rem]">
                        {liveCourses.slice(0, 8).map((course, idx) => {
                            return <CourseLiveCard key={idx} course={course}></CourseLiveCard>;
                        })}
                    </div>
                </section>
            </div>
        );
    }
    /*const { data: courseResponse } = useGetCoursesQuery({
        limit: 8,
        page: 1,
        isApproved: true,
    });
    const liveCourses = courseResponse?.data?.items ? courseResponse.data.items : [];*/

    /*return (
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
                    {myCourses.slice(0, 8).map((course, idx) => {
                        return <CourseListCard key={idx} course={course}></CourseListCard>;
                    })}
                </div>
            </section>
            <section className="flex flex-col px-24 space-y-4">
                <div className="flex justify-between py-2.5">
                    <p className=" text-text/lg/bold">Đã học</p>
                    <p className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
                </div>
                <div className="grid grid-cols-4 gap-[1rem]">
                    {liveCourses.slice(0, 8).map((course, idx) => {
                        return <CourseLiveCard key={idx} course={course}></CourseLiveCard>;
                    })}
                </div>
            </section>
            <section className="flex flex-col px-24 space-y-4">
                <div className="flex justify-between py-2.5">
                    <p className=" text-text/lg/bold">Đã thích</p>
                    <p className="text-text/md/semibold text-primary-500 cursor-pointer">Xem tất cả</p>
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
    );*/
};

export default AllCoursesPage;
