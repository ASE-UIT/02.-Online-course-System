import {
    LecturerLandingIcon,
    LecturerLandingIconReason1,
    LecturerLandingIconReason2, LecturerLandingIconReason3
} from "@/assets/LecturerLandingIcon.jsx";
import { Button } from "@/components/ui/button";

function LecturerLandingPage() {
return (
    <div className="w-full h-full">
        <section>
            <section className="bg-warning-50 pt-20">
                <div
                    className="lg:w-9/12 mx-auto max-h-fit flex  justify-between space-x-8">
                    <div className="text-left max-w-md max-h-fit  pt-2">
                        <h2 className="text-display/md/bold text-black-500">Hãy đến giảng dạy với chúng tôi</h2>
                        <p className="text-text/md/regular pt-2.5">Trở thành giảng viên và thay đổi cuộc sống của mọi
                            người, bao gồm cả cuộc sống của chính bạn</p>
                        <Button className="w-[195px] mt-2.5 rounded-xl bg-warning-700 hover:bg-warning-800
                        justify-center flex">
                            <span>Bắt đầu</span>
                            <span >→</span>
                        </Button>
                    </div>
                    <div className="flex-shrink-0 ">
                        <LecturerLandingIcon />
                    </div>
                </div>

            </section>
            <section className="py-10">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-display/sm/semibold">Có quá nhiều lý do để bắt đầu</h2>
                    <div className="flex justify-around pt-5 ">
                        <div className="max-w-xs flex flex-col items-center text-center p-1">
                            <div>
                                <LecturerLandingIconReason1/>
                            </div>
                            <p className=" text-text/lg/semibold">Giảng dạy theo cách của bạn</p>
                            <p className=" text-text/md/regular">Xuất bản khóa học mong muốn, theo cách mong muốn
                                và bạn luôn có quyền kiểm soát nội dung của riêng mìnhn</p>
                        </div>
                        <div className="max-w-xs flex flex-col items-center text-center p-1">
                            <div>
                                <LecturerLandingIconReason2/>
                            </div>
                            <p className="text-text/lg/semibold">Truyền cảm hứng cho học viên</p>
                            <p className="text-text/md/regular">Dạy những gì bạn biết và giúp học viên khám phá
                                sở thích, tiếp thu kỹ năng mới và thăng tiến trong sự nghiệp của họ.</p>
                        </div>
                        <div className="max-w-xs flex flex-col items-center text-center p-1">
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
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 ">
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
    </div>);
}

export default LecturerLandingPage;