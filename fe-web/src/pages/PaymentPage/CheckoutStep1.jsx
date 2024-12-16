import {useEffect, useState} from "react"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {OrderSummary} from "@/pages/PaymentPage/OrderSummary.jsx";
import {Stepper} from "@/pages/PaymentPage/Stepper.jsx";
import {useNavigate, useOutletContext} from "react-router-dom";
import {courseApi, courseCartApi} from "@/api/courseApi";
import {OrderInformation} from "@/pages/PaymentPage/OrderInformation.jsx";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {useDispatch} from "react-redux";
import {addInfoPayment} from "@/store/slices/paymentSlice.js";

export default function CheckoutStep1Page() {
    const {setCurrentStep, order} = useOutletContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault()
        setCurrentStep(2);
        navigate("/web/checkout/step2");
    }

    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Họ tên ít nhất có 2 ký tự"
        }).max(50),
        email: z.string().email({
            message: "Email không hợp lệ."
        }),
        phone: z.string().min(10, {
            message: "Số điện thoại phải có ít nhất 10 ký tự."
        }),
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });
    const getMyStudentProfile = async () => {
        try {
            const response = await courseCartApi.getMyProfile();
            if (response?.success) {
                console.log("profile", response.data);
                form.reset({
                    name: response.data.name || "",
                    email: response.data.email || "",
                    phone: response.data.phoneNumber || "",
                })
            }
        } catch (error) {
            console.log(error.response?.errors.msg);
        }

    };
    function onSubmit(values) {
        setCurrentStep(2);
        console.log(values.name, values.email, values.phone);

        dispatch(addInfoPayment({info: {name: values.name, email: values.email, phone: values.phone}}))

        navigate("/web/checkout/step2");
    }

    useEffect(() => {
        setCurrentStep(1)
        getMyStudentProfile()
    }, []);
    return (
        <div className="flex gap-5 px-[80px] py-[20px]">
            <div className="bg-white rounded-[8px] p-6 grow space-y-2.5 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.07)]">
                <h2 className="text-text/xl/semibold font-worksans">Thông tin người mua</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-text/md/medium font-worksans text-black">
                                        Họ tên<span className="text-error-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-gray-600"
                                            autoComplete="given-name"
                                            placeholder="Nhập họ tên của bạn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-text/md/medium">
                                        Email<span className="text-error-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-gray-600"
                                            autoComplete="email"
                                            placeholder="Nhập email của bạn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-text/md/medium">
                                        Số điện thoại<span className="text-error-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-gray-600"
                                            type="text"
                                            placeholder="Nhập số điện thoại của bạn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full bg-primary-500 hover:bg-primary/90
                            text-text/md/medium font-worksans text-white
                            ">
                            Tiếp tục
                        </Button>
                    </form>
                </Form>
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

