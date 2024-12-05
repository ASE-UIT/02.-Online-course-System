
import { Button } from "@/components/ui/button"
import {Stepper} from "@/pages/PaymentPage/Stepper.jsx";
import {useNavigate} from "react-router-dom";
import FailIcon from "@/assets/FailIcon.jsx";

export default function CheckoutFailPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen px-20 py-6 space-y-5 ">
            <Stepper result={false} currentStep={3} className="mb-12" />

            <div className="w-[797px] mx-auto py-10 px-20 shadow-[0px_8px_72.4px_0px_rgba(0,0,0,0.13)] rounded-10 flex flex-col gap-5 items-center">
                <div className="text-center flex flex-col justify-center items-center gap-3">
                    <div className="inline-flex items-center justify-center w-[142px] h-[142px] rounded-full">
                        <FailIcon />
                    </div>

                    <h1 className="text-display/lg/semibold text-black">
                        Thanh toán thất bại
                    </h1>
                    <p className="text-text/md/regular text-black-500">
                        Hệ thống đã gặp một số lỗi trong quá trình thanh toán. Vui lòng thử lại!
                    </p>
                </div>
                <Button
                    className="bg-primary hover:bg-primary/90 text-text/md/medium font-worksans text-white px-3 py-4 h-auto
                        shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)] w-[129px]"
                    onClick={() => navigate("/web/learning")}
                >
                    Thử lại
                </Button>
            </div>
        </div>
    )
}
