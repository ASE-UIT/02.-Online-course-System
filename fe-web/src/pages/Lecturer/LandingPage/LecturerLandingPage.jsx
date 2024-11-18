import {
    LecturerLandingIcon,
    LecturerLandingIconReason1,
    LecturerLandingIconReason2,
    LecturerLandingIconReason3,
    LecturerLandingIcon4,
    LecturerLandingIcon5,
    LecturerLandingIcon6,
    LecturerLandingIcon7
} from "@/assets/LecturerLandingIcon.jsx";
import { Button } from "@/components/ui/button";
import {AiOutlineArrowRight} from "react-icons/ai";
import * as React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
function LecturerLandingPage() {
return (
    <div className="w-full h-full">
        <section>
            <section className="bg-warning-50 pt-20">
                <div
                    className="w-9/12 mx-auto max-h-fit flex  justify-between space-x-8">
                    <div className="text-left max-w-md max-h-fit  pt-2">
                        <h2 className="text-display/md/bold text-black-500">Hãy đến giảng dạy với chúng tôi</h2>
                        <p className="text-text/md/regular pt-2.5 space-y-4">Trở thành giảng viên và thay đổi cuộc
                            sống của mọi người, bao gồm cả cuộc sống của chính bạn</p>
                            <Button variant="default"
                                    size="lg"
                                    className="bg-warning-700 hover:bg-warning-700/90 mt-2" >
                                <span className="text-text/md/medium text-white">Bắt đầu</span>
                                <AiOutlineArrowRight className="ml-2" size={24}></AiOutlineArrowRight>
                            </Button>

                    </div>
                    <div className="flex-shrink-0 ">
                        <LecturerLandingIcon />
                    </div>
                </div>

            </section>
            <section className="py-10">
                <div className="max-w-full mx-auto  sm:px-6 px-8 text-center">
                    <h2 className="text-display/sm/semibold">Có quá nhiều lý do để bắt đầu</h2>
                    <div className="flex justify-around pt-5 ">
                        <div className="w-1/4 flex flex-col items-center text-center p-1">
                            <div>
                                <LecturerLandingIconReason1/>
                            </div>
                            <p className=" text-text/lg/semibold">Giảng dạy theo cách của bạn</p>
                            <p className=" text-text/md/regular">Xuất bản khóa học mong muốn, theo cách mong muốn
                                và bạn luôn có quyền kiểm soát nội dung của riêng mìnhn</p>
                        </div>
                        <div className="w-1/4 flex flex-col items-center text-center p-1">
                            <div>
                                <LecturerLandingIconReason2/>
                            </div>
                            <p className="text-text/lg/semibold">Truyền cảm hứng cho học viên</p>
                            <p className="text-text/md/regular">Dạy những gì bạn biết và giúp học viên khám phá
                                sở thích, tiếp thu kỹ năng mới và thăng tiến trong sự nghiệp của họ.</p>
                        </div>
                        <div className="w-1/4 flex flex-col items-center text-center p-1">
                            <div>
                                <LecturerLandingIconReason3/>
                            </div>
                            <p className="text-text/lg/semibold">Nhận phần thưởng xứng đáng</p>
                            <p className="text-text/md/regular">Mở rộng mạng lưới nghề nghiệp, xây dựng kiến thức
                                chuyên môn và kiếm thu nhập từ mỗi lượt ghi danh có trả phí.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-warning-950 py-16">
                <div className="max-w-full mx-auto px-4 sm:px-6 px-8 ">
                    <div className="flex justify-around ">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-display/md/semibold text-white">73 triệu</h2>
                            <p className="font-family: Inter;font-size: 12px;font-weight: 400;line-height: 14.52px;
                            text-align: left; text-white">Học viên</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-display/md/semibold text-white">Hơn 75</h2>
                            <p className="font-family: Inter;font-size: 12px;font-weight: 400;line-height: 14.52px;
                            text-align: left; text-white">Ngôn ngữ</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-display/md/semibold text-white">1 tỷ</h2>
                            <p className="font-family: Inter;font-size: 12px;font-weight: 400;line-height: 14.52px;
                            text-align: left; text-white">Lượt ghi danh</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-display/md/semibold text-white">Hơn 180</h2>
                            <p className="font-family: Inter;font-size: 12px;font-weight: 400;line-height: 14.52px;
                            text-align: left; text-white">Quốc gia</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-display/md/semibold text-white">Hơn 16,000</h2>
                            <p className="font-family: Inter;font-size: 12px;font-weight: 400;line-height: 14.52px;
                            text-align: left; text-white">Khách hàng doanh nghiệp</p>
                        </div>
                    </div>
                </div>
            </section>


        </section>
        {/* How to Start Section */}
        <section className="py-5">
            <div className="max-w-full px-4  sm:px-6 px-8">
                <h2 className="text-display/sm/semibold text-black text-center">Cách thức bắt đầu</h2>
                <div className="flex justify-around pt-5 max-w-full ">
                    <Tabs.Root defaultValue="tab1">
                        <Tabs.List className="flex  justify-center">
                            <Tabs.Trigger value="tab1"
                                          className="text-text/lg/semibold text-black-300 px-4 py-2 border-b border-black-300
                                            focus:outline-none focus:text-black-500 focus:border-b-2 focus:border-black-500
                                            aria-selected:border-black-500 aria-selected:border-b-2 aria-selected:text-black-500
                                            ">
                                Lên kế hoạch cho khung chương trình
                            </Tabs.Trigger>
                            <Tabs.Trigger value="tab2"
                                          className="text-text/lg/semibold text-black-300 px-4 py-2 border-b border-black-300
                                          focus:outline-none focus:text-black-500 focus:border-b-2 focus:border-black-500
                                          aria-selected:border-black-500 aria-selected:border-b-2 aria-selected:text-black-500
                                          ">
                                Quay video
                            </Tabs.Trigger>
                            <Tabs.Trigger value="tab3"
                                          className="text-text/lg/semibold text-black-300 px-4 py-2 border-b border-black-300
                                          focus:outline-none focus:text-black-500 focus:border-b-2 focus:border-black-500
                                          aria-selected:border-black-500 aria-selected:border-b-2 aria-selected:text-black-500
                                          ">
                                Ra mắt khoá học
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="tab1" className="p-4">
                            <section>
                                <div className="w-9/12 mx-auto max-h-full flex justify-between space-x-8 px-16">
                                    {/* Text Content */}
                                    <div className="text-left my-11 max-h-fit pt-2 px-5">
                                        <p className="text-text/md/regular mb-2">Hãy bắt đầu với niềm đam mê và kiến
                                            thức của bạn.
                                            Sau đó, bạn có thể chọn một chủ đề triển vọng với sự trợ giúp của công cụ
                                            </p>
                                        <p className="text-text/md/regular mb-2">Thông tin chi tiết về thị trường.</p>
                                        <p className="text-text/md/regular mb-2">Bạn là người quyết định phương pháp cũng như kiến thức giảng dạy.</p>
                                        <p className="text-text/md/bold mb-2">Cách chúng tôi trợ giúp bạn</p>
                                        <p className="text-text/md/regular mb-2">Chúng tôi cung cấp nhiều tài nguyên về cách tạo khóa học đầu tiên.
                                            Ngoài ra, bảng điều khiển của giảng viên và trang khung chương trình của
                                            chúng tôi sẽ giúp bạn tổ chức khóa học hiệu quả</p>

                                    </div>
                                    {/* Image */}
                                    <div className="max-h-full">
                                        <LecturerLandingIcon4></LecturerLandingIcon4>
                                    </div>
                                </div>
                            </section>
                        </Tabs.Content>
                        <Tabs.Content value="tab2" className="p-4">
                            <section>
                                <div className="w-9/12 mx-auto max-h-full flex justify-between space-x-8 px-16">
                                    {/* Text Content */}
                                    <div className="text-left my-11 max-h-fit pt-2 px-5">
                                        <p className="text-text/md/regular mb-2">
                                            Sử dụng các công cụ cơ bản như điện thoại thông minh hoặc camera DSLR.
                                            Thêm một chiếc micrô tốt là bạn đã sẵn sàng bắt đầu.
                                        </p>
                                        <p className="text-text/md/regular mb-2">
                                            Nếu không thích xuất hiện trên camera, bạn chỉ cần ghi lại màn hình của
                                            mình . Dù với cách nào thì bạn cũng nên quay video dài từ 2 tiếng trở lên
                                            cho khóa học có trả phí.</p>
                                        <p className="text-text/md/bold mb-2">Cách chúng tôi trợ giúp bạn</p>
                                        <p className="text-text/md/regular mb-2">
                                            Nhóm Hỗ trợ của chúng tôi luôn sẵn sàng trợ giúp bạn trong suốt quá trình
                                            thực hiện và đưa ra phản hồi về video thử nghiệm.</p>

                                    </div>
                                    {/* Image */}
                                    <div className="max-h-full">
                                        <LecturerLandingIcon5/>
                                    </div>
                                </div>
                            </section>
                        </Tabs.Content>
                        <Tabs.Content value="tab3" className="p-4">
                            <section>
                                <div className="w-9/12 mx-auto max-h-full flex justify-between space-x-8 px-16">
                                    {/* Text Content */}
                                    <div className="text-left my-11 max-h-fit pt-2 px-5">
                                        <p className="text-text/md/regular mb-2">
                                            Thu thập các xếp hạng và đánh giá đầu tiên bằng cách quảng bá khóa học trên
                                            mạng xã hội và mạng lưới nghề nghiệp của bạn.
                                            Người dùng sẽ dễ dàng khám phá khóa học của bạn trên cổng khóa học của chúng
                                            tôi. Đây là nơi bạn kiếm được doanh thu từ mỗi lượt ghi danh có trả phí.
                                        </p>
                                        <p className="text-text/md/regular mb-2">
                                            Nếu không thích xuất hiện trên camera, bạn chỉ cần ghi lại màn hình của
                                            mình . Dù với cách nào thì bạn cũng nên quay video dài từ 2 tiếng trở lên
                                            cho khóa học có trả phí.</p>
                                        <p className="text-text/md/bold mb-2">Cách chúng tôi trợ giúp bạn</p>
                                        <p className="text-text/md/regular mb-2">
                                            Nhóm Hỗ trợ của chúng tôi luôn sẵn sàng trợ giúp bạn trong suốt quá trình
                                            thực hiện và đưa ra phản hồi về video thử nghiệm.</p>

                                    </div>
                                    {/* Image */}
                                    <div className="max-h-full">
                                        <LecturerLandingIcon6/>
                                    </div>
                                </div>
                            </section>
                        </Tabs.Content>
                    </Tabs.Root>
                </div>
            </div>
        </section>

        {/* Support Section */}
        <section className="py-10">
            <div className="flex flex-col items-center justify-between text-center max-w-full space-y-5">
                <div>
                    <LecturerLandingIcon7/>
                </div>
                <p className="text-display/sm/semibold">Bạn sẽ không phải làm việc này một mình</p>
                <p className="text-text/sm/regular w-1/2">Nhóm Hỗ trợ giảng viên luôn có mặt để giải đáp thắc mắc
                    cũng như đánh giá video thử nghiệm của bạn.
                    Đồng thời, Teaching Center cung cấp cho bạn nhiều tài nguyên để giúp bạn trong suốt quá trình
                    làm việc. Ngoài ra, bạn sẽ nhận được sự hỗ trợ từ các giảng viên giàu kinh nghiệm trong cộng
                    đồng online.</p>
            </div>

        </section>

        {/* Call to Action Section */}
        <section className="py-5 text-center bg-gray-300">
        <div className="max-w-full mx-auto px-8 flex flex-col items-center justify-between space-y-5">
                <p className="text-display/sm/semibold">Trở thành giảng viên ngay hôm nay</p>
                <p className="text-text/sm/regular">Tham gia một trong những thị trường học tập trực tuyến lớn nhất thế giới.</p>
                <Button className="w-1/5">Bắt đầu</Button>
            </div>
        </section>
    </div>);
}

export default LecturerLandingPage;