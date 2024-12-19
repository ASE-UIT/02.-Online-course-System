import {
  calculateDiscountPercentage,
  convertToHoursAndMinutes,
  formatCurrency
} from "@/utils/converter";
import { Award, BookCopy, Clock, Heart, Video } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useGetEnrollmentQuery
} from "@/store/rtk/cart.services.js";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop.jsx";
import { useToast } from "@/hooks/use-toast.js";
import { cn } from "@/lib/utils.js";

export default function CourseInfo({ course }) {
  const { data: cart } = useGetCartQuery();
  const [addToCart, { isLoading: isAddLoading }] = useAddToCartMutation();
  const [isInCart, setIsInCart] = useState(false);
  const [isInEnrollment, setIsInEnrollment] = useState(false);
  const navigate = useNavigate();
  const { data: enrollment } = useGetEnrollmentQuery();
  useScrollToTop();
  const { toast } = useToast();

  useEffect(() => {
    if (cart && course) {
      const itemInCart = cart?.data?.items?.some(
        (item) => item.courseId === course.id
      );
      setIsInCart(itemInCart);
    }
  }, [cart, course]);

  useEffect(() => {
    if (enrollment && course) {
      const itemInEnrollment = enrollment?.data?.some(
        (item) => item.courseId === course.id
      );
      setIsInEnrollment(itemInEnrollment);
    }
  }, [enrollment, course]);

  const handleAddToCart = async () => {
    try {
      const payload = {
        courseId: course.id
      };
      await addToCart(payload);
      toast({
        title: (
          <p className=" text-success">Thêm khóa học vào giỏ hàng thành công</p>
        ),
        status: "success",
        duration: 2000
      });
    } catch (error) {
      console.error("Failed to add item to cart", error);
      toast({
        title: (
          <p className=" text-error">Thêm khóa học vào giỏ hàng thất bại</p>
        ),
        status: "error",
        duration: 2000
      });
    }
  };

  return (
    <div
      className="rounded-[4px] mt-[35%] mx-auto w-[300px] xl:w-[450px] h-fit overflow-hidden "
      style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div
        className="w-full bg-no-repeat bg-center bg-contain h-[276px]"
        style={{
          backgroundImage: `url(${course.thumbnail})`
        }}
      ></div>
      <div className="p-[20px] bg-white">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-end gap-2">
            <p className="text-display/md/bold text-primary-500">
              đ{formatCurrency(course?.sellPrice)}
            </p>
            <p className="text-text/xl/semibold text-gray-600 line-through">
              đ{formatCurrency(course?.originalPrice)}
            </p>
          </div>
          <p className="text-text/xl/regular mt-1">
            Giảm{" "}
            {calculateDiscountPercentage(
              course?.originalPrice,
              course?.sellPrice
            )}
            %
          </p>
        </div>
        <div className="flex mt-6 gap-2 justify-between">
          {isInCart ? (
            <div
              style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)" }}
              className="text-warning-100 px-[16px] py-[12px] hover:bg-error-950 cursor-pointer select-none bg-error-900 flex-1 h-[48px] text-text/md/medium rounded-[8px] text-center"
              onClick={() => navigate("/web/cart")}
            >
              Đi tới giỏ hàng
            </div>
          ) : (
            <div
              style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)" }}
              className={cn(
                "text-warning-950 px-[16px] py-[12px] hover:bg-warning-200 cursor-pointer select-none bg-warning-100 flex-1 h-[48px] text-text/md/medium rounded-[8px] text-center",
                isInCart || isAddLoading ? "pointer-events-none opacity-50" : ""
              )}
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </div>
          )}
          <div
            style={{ boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.25)" }}
            className="w-[40px] flex items-center cursor-pointer  justify-center rounded-[4px] h-[40px] "
          >
            <Heart className="w-[24px] h-[24px]" />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Video className="w-[20px] h-[20px]" />
            <p className="text-text/md/regular">
              Thời lượng:{" "}
              <span className="text-text/md/semibold">
                {convertToHoursAndMinutes(course?.duration / 60)}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <BookCopy className="w-[20px] h-[20px]" />
            <p className="text-text/md/regular">
              Giáo trình:{" "}
              <span className="text-text/md/semibold">
                {course?.lessonParts?.length} bài giảng
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-[20px] h-[20px]" />
            <p className="text-text/md/regular">Sở hữu khóa học trọn đời</p>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-[20px] h-[20px]" />
            <p className="text-text/md/regular">Cấp chứng nhận hoàn thành</p>
          </div>
        </div>
        {isInEnrollment ? (
          <div
            style={{
              boxShadow: "3px 10px 20px 0px rgba(0, 56, 255, 0.38)"
            }}
            className="text-text/md/medium font-worksans py-[12px] px-[16px] text-white bg-primary-500 rounded-[8px] mt-8 cursor-pointer hover:bg-primary-600 transition-all h-[48px] flex items-center justify-center"
            onClick={() => {
              navigate(`/web/learning/${course.id}`);
            }}
          >
            Đi tới khóa học
          </div>
        ) : (
          <div
            style={{
              boxShadow: "3px 10px 20px 0px rgba(0, 56, 255, 0.38)"
            }}
            className="text-text/md/medium font-worksans py-[12px] px-[16px] text-white bg-primary-500 rounded-[8px] mt-8 cursor-pointer hover:bg-primary-600 transition-all h-[48px] flex items-center justify-center"
            onClick={async () => {
              await handleAddToCart();
              navigate("/web/cart");
            }}
          >
            Mua ngay
          </div>
        )}
      </div>
    </div>
  );
}
