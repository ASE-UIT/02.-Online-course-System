
import { Button } from "@/components/ui/button"
import {Stepper} from "@/pages/PaymentPage/Stepper.jsx";
import {useNavigate} from "react-router-dom";
import { ResultIcon } from "@/assets";

export default function CheckoutSuccessPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen px-20 py-6 space-y-5 ">
                <Stepper result={true} currentStep={3} className="mb-12" />

                <div className="w-[797px] mx-auto py-10 px-20 shadow-[0px_8px_72.4px_0px_rgba(0,0,0,0.13)] rounded-10 flex flex-col gap-5 items-center">
                    <div className="text-center flex flex-col justify-center items-center gap-3">
                        <div className="inline-flex items-center justify-center w-[144px] h-[132px] rounded-full">
                            <ResultIcon />
                        </div>

                        <h1 className="text-display/lg/semibold text-black">
                            Thanh toán thành công
                        </h1>
                        <p className="text-text/md/regular text-black-500">
                            Bạn đã thanh toán thành công số tiền đ000,000 cho đơn hàng
                        </p>
                    </div>
                    <Button
                        className="bg-primary hover:bg-primary/90 text-text/md/medium font-worksans text-white px-3 py-4 h-auto
                        shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)] w-[259px]"
                        onClick={() => navigate("/web/learning")}
                    >
                        Chuyển đến khoá học ngay
                    </Button>
                </div>
        </div>
    )
}
