import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { studentRegisterPhone } from "@/api";
import { useState } from "react";

const phoneFormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "Họ phải có ít nhất 2 ký tự."
    }),
    lastName: z.string().min(2, {
      message: "Tên phải có ít nhất 2 ký tự."
    }),
    phone: z.string().min(10, {
      message: "Số điện thoại phải có ít nhất 10 ký tự."
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

const StepOneWithPhone = () => {
  const { toast } = useToast();
  const { signUpType } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const phoneForm = useForm({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      confirmPassword: ""
    }
  });

  const formatPhoneNumber = (phone) => {
    if (phone.startsWith("0")) {
      return `+84${phone.slice(1)}`;
    }
    return phone;
  };

  // phone form
  async function onPhoneSubmit(values) {
    setIsLoading(true);
    if (values.password !== values.confirmPassword) {
      phoneForm.setError("confirmPassword", {
        message: "Mật khẩu không khớp."
      });
      return;
    }

    const fullName = values.firstName + " " + values.lastName;
    const phoneNumber = formatPhoneNumber(values.phone);

    try {
      const respone = await studentRegisterPhone(
        fullName,
        phoneNumber,
        values.password
      );

      if (respone.data.code === 200) {
        toast({
          title: <p className=" text-green-700">Đăng ký thành công</p>,
          description: respone.data.message,
          status: "success",
          duration: 2000
        });
        navigate(`/web/sign-up/step2/${signUpType}/${phoneNumber}`);
      }
    } catch (error) {
      toast({
        title: <p className=" text-red-700">Đăng ký thất bại</p>,
        description: error.response.data.errors.msg,
        status: "error",
        duration: 2000
      });

      phoneForm.setError("phone", {
        message: error.response.data.errors.msg
      });
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="text-center flex flex-col gap-3">
        <h2 className="text-display/lg/semibold text-black">Đăng ký</h2>
        <p className="text-text/md/regular text-[#747474]">
          Tạo tài khoản để có trải nghiệm tốt nhất
        </p>
      </div>
      <Form {...phoneForm}>
        <form
          onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
          className="space-y-5"
        >
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={phoneForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">Họ</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-600"
                      autoComplete="given-name"
                      placeholder={field.value}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={phoneForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Tên<span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-600"
                      autoComplete="family-name"
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
            control={phoneForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text/md/medium">
                  Số điện thoại<span className="text-error-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-600"
                    type="text"
                    placeholder={field.value}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={phoneForm.control}
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
                    autoComplete="new-password"
                    placeholder={field.value}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={phoneForm.control}
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
                    autoComplete="new-password"
                    placeholder={field.value}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full mt-5 rounded-xl shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)]"
          >
            {isLoading ? "Đang xử lý..." : "Tiếp tục"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default StepOneWithPhone;
