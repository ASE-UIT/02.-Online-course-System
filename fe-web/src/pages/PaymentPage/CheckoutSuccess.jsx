import { Button } from "@/components/ui/button";
import { Stepper } from "@/pages/PaymentPage/Stepper.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ResultIcon } from "@/assets";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "@/utils/converter";
import {useScrollToTop} from "@/hooks/index.js";

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const { setCurrentStep, setResult } = useOutletContext();
  const { totalPrice } = useSelector((state) => state.payment);
  useScrollToTop();

  useEffect(() => {
    setCurrentStep(3);
    setResult(true);
    console.log(totalPrice);
  }, []);
  return (
    <div className="py-20 flex justify-center items-center">
      <div className="w-[797px] py-10 px-20 shadow-[0px_8px_72.4px_0px_rgba(0,0,0,0.13)] rounded-[40px] flex flex-col gap-5 items-center">
        <div className="text-center flex flex-col justify-center items-center gap-3">
          <div className="inline-flex items-center justify-center w-[144px] h-[132px] rounded-full">
            <ResultIcon />
          </div>

          <h1 className="text-display/lg/semibold text-black">
            Thanh toán thành công
          </h1>
          <p className="text-text/md/regular text-black-500">
            Bạn đã thanh toán thành công số tiền đ{formatCurrency(totalPrice)}{" "}
            cho đơn hàng
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-text/md/medium font-worksans text-white px-3 py-4 h-auto
                        shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)] w-[259px]"
          onClick={() => navigate("/web/course-list")}
        >
          Chuyển đến khoá học ngay
        </Button>
      </div>
    </div>
  );
}
