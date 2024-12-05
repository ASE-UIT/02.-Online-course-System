
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {OrderSummary} from "@/pages/PaymentPage/OrderSummary.jsx";
import {Stepper} from "@/pages/PaymentPage/Stepper.jsx";
import {useNavigate} from "react-router-dom";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        //setCurrentStep(2)
        navigate("/web/checkout/step2");
    }

    return (
        <div className="min-h-screen px-20 py-6 space-y-5 ">
                <Stepper currentStep={1}/>
                <div className="flex gap-5">
                    {/* Customer Information Form */}
                    <div className="bg-white rounded-[8px] p-6 grow space-y-2.5 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.07)]">
                        <h2 className="text-text/xl/semibold font-worksans">Thông tin người mua</h2>
                        <form onSubmit={handleSubmit} className="space-y-2.5">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-text/md/medium font-worksans">
                                    Họ tên<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Nhập họ tên của bạn"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-text/md/medium font-worksans">
                                    Email<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Nhập email của bạn"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-text/md/medium font-worksans">
                                    Điện thoại<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="Nhập số điện thoại của bạn"
                                />
                            </div>

                            <Button type="submit" className="w-full bg-primary-500 hover:bg-primary/90
                            text-text/md/medium font-worksans text-white
                            ">
                                Tiếp tục
                            </Button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="w-[454px] " >
                        <OrderSummary
                            numItems={2}
                            total={2000000}
                            onCheckout={() => setCurrentStep(2)}
                        />
                    </div>
                </div>
        </div>
    )
}

