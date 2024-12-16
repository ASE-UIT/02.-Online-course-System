import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx"
import {useNavigate, useOutletContext} from "react-router-dom";
import {OrderInformation} from "@/pages/PaymentPage/OrderInformation.jsx";
import {courseCartApi} from "@/api/courseApi.js";
import {paymentApi} from "@/api/paymentApi.js";
import {useSelector} from "react-redux";

export default function CheckoutStep2Page() {
    const [paymentMethod, setPaymentMethod] = useState("VNPAY")
    const navigate = useNavigate();
    const {name, email, phone, totalPrice} = useSelector(state => state.payment);
    const paymentMethods = [
        {
            id: "VNPAY",
            name: "Thẻ ATM/Internet Banking VNPay",
        },
        {
            id: "MOMO",
            name: "Ví điện tử Momo",
        },
        {
            id: "SHOPEE",
            name: "Ví điện tử Shopee Pay",
        },
        {
            id: "ZALO",
            name: "Ví điện tử Zalo Pay",
        },
        {
            id: "BANK",
            name: "Chuyển khoản ngân hàng",
        },
        {
            id: "CARD",
            name: "Thẻ quốc tế Visa/Master",
        },
    ]
    const {setCurrentStep, order} = useOutletContext();
    const createOrder = async () => {
        try {
            const formData = new FormData();
            formData.append("payType", paymentMethod)
            formData.append("customerFullname", name)
            formData.append("customerEmail", email)
            formData.append("customerPhone", phone)
            const response = await courseCartApi.createOrder(formData);
            if (response?.success) {
                console.log(response.data);
                const responseGetPaymentUrl = await paymentApi.getPaymentURL(response.data.payment.id);
                if (responseGetPaymentUrl?.success) {
                    console.log(responseGetPaymentUrl.data);
                    window.history.replaceState(null, '', '/web/cart');
                    window.location.href = responseGetPaymentUrl.data.payUrl;
                }
            }
        } catch (error) {
            console.log(error.response?.errors.msg);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createOrder();
    }
    useEffect(() => {
        setCurrentStep(2);
    }, []);
    return (
        <div className="flex gap-5 px-[80px] py-[20px]">
            <div className="flex flex-col gap-3 bg-white grow">
                <h2 className="text-text/xl/semibold font-worksans">Hình thức thanh toán</h2>
                <div
                    className=" rounded-[8px] p-6 space-y-2.5 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.07)]">
                    <form onSubmit={handleSubmit} className="space-y-2.5">
                        <RadioGroup
                            value={paymentMethod}
                            onValueChange={setPaymentMethod}
                            className="space-y-2.5"
                        >
                            {paymentMethods.map((method) => (
                                <Label
                                    key={method.id}
                                    className="flex items-center gap-2.5 border rounded-[4px] py-4 px-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                    htmlFor={method.id}
                                >
                                    <RadioGroupItem
                                        value={method.id}
                                        id={method.id}
                                        className="h-5 w-5 border-[1px] border-slate-200 text-primary-500"
                                    />
                                    <span className="text-text/md/medium font-worksans text-black">{method.name}</span>
                                </Label>
                            ))}
                        </RadioGroup>

                        <Button
                            type="submit"
                            className="w-full bg-primary-500 hover:bg-primary/90
                            text-text/md/medium font-worksans text-white"
                        >
                            Tiến hành thanh toán
                        </Button>
                    </form>
                </div>

            </div>
            <div className="w-[454px] ">
                <OrderInformation
                    numItems={order?.length}
                    order={order}
                />
            </div>
        </div>
    )
}

