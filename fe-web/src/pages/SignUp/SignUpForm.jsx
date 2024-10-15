import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Phone } from "lucide-react";
import { GoogleIcon } from "@/assets";
import FacebookIcon from "/picture/FacebookIcon.svg";
import VerifyCode from "./VerifyCode";

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "Họ phải có ít nhất 2 ký tự."
    }),
    lastName: z.string().min(2, {
      message: "Tên phải có ít nhất 2 ký tự."
    }),
    email: z.string().email({
      message: "Email không hợp lệ."
    }),
    password: z.string().min(8, {
      message: "Mật khẩu phải có ít nhất 8 ký tự."
    }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp.",
    path: ["confirmPassword"]
  });

function SignUpForm() {
  const [step, setStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  function onSubmit(values) {
    console.log(values);
    setStep(2);
  }

  return (
    <div className="flex px-10 flex-col align-center gap-5 flex-1">
      {step === 1 ? (
        <>
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-display/lg/semibold text-black">Đăng ký</h2>
            <p className="text-text/md/regular text-[#747474]">
              Tạo tài khoản để có trải nghiệm tốt nhất
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text/md/medium">Họ</FormLabel>
                      <FormControl>
                        <Input
                          className="border-gray-600"
                          placeholder={field.value}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text/md/medium">
                        Tên<span className="text-error-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="border-gray-600"
                          placeholder={field.value}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Email<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-600"
                        type="email"
                        placeholder={field.value}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Mật khẩu<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-600"
                        type="password"
                        placeholder={field.value}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Xác nhận mật khẩu<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-600"
                        type="password"
                        placeholder={field.value}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-5 rounded-xl shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)]"
              >
                Tiếp tục
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <VerifyCode />
      )}
      <div className="text-center text-text/md/medium text-black">
        Đã có tài khoản?{" "}
        <Link
          to="/login"
          className="text-primary text-text/md/semibold underline"
        >
          Đăng nhập ngay
        </Link>
      </div>
      <div className="relative my-2.5 flex justify-center text-black-200">
        <Separator className="w-full" />
        <span className="absolute -top-2.5 bg-white px-5 text-text/sm/regular">
          Hoặc đăng ký với
        </span>
      </div>
      <div className="flex flex-col gap-5">
        <Button
          variant="outline"
          size="icon"
          className="w-full flex rounded-xl"
        >
          <div className="pl-4">
            <Phone />
          </div>
          <span className="text-text/md/semibold w-full">Số điện thoại</span>
        </Button>
        <div className="flex justify-center items-center gap-5">
          <Button
            variant="outline"
            size="icon"
            className="w-full flex rounded-xl"
          >
            <div className="pl-4">
              <GoogleIcon />
            </div>
            <span className="text-text/md/semibold w-full">Google</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-full flex rounded-xl"
          >
            <img src={FacebookIcon} alt="FacebookIcon" className="pl-4" />
            <span className="text-text/md/semibold w-full">Facebook</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
