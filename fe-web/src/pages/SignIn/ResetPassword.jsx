import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { studentResetPassword } from "@/api";

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự."
  }),
  confirmPassword: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự."
  })
});

function ResetPassword() {
  const { toast } = useToast();
  const { emailOrPhone, otp } = useParams();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      password: ""
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values) {
    setIsLoading(true);

    const { confirmPassword, password } = values;
    if (confirmPassword !== password) {
      form.setError("confirmPassword", {
        message: "Mật khẩu không trùng khớp"
      });
      setIsLoading(false);
      return;
    }
    try {
      const respone = await studentResetPassword(emailOrPhone, otp, password);

      if (respone.code === 200 || respone.data.code === 200) {
        console.log("respone.data", respone.data.data.token);
        navigate("/web/sign-in");
        toast({
          title: <p className=" text-green-700">Đổi mật khẩu thành công</p>,
          description: "OTP đã được gửi để đặt lại mật khẩu",
          status: "success",
          duration: 2000
        });
      }
    } catch (error) {
      if (error.response.data.errors?.code === "INVALID_OTP") {
        toast({
          title: <p className=" text-red-700">Lỗi OTP</p>,
          description: error.response.data.errors.msg,
          duration: 2000
        });
      } else {
        toast({
          title: <p className=" text-red-700">Thất bại</p>,
          description: "Lỗi không xác định",
          duration: 2000
        });
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  return (
    <div className="flex px-10 flex-col align-center gap-5 flex-1">
      <>
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-display/lg/semibold text-black">
            Đặt lại mật khẩu
          </h2>
          <p className="text-text/md/regular text-[#747474]">
            Chọn mật khẩu mới cho tài khoản của bạn
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
              disabled={isLoading}
              type="submit"
              className="w-full mt-5 rounded-xl shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)]"
            >
              {isLoading ? "Đang xử lý..." : "Lưu"}
            </Button>
          </form>
        </Form>
      </>
      {/* <div className="text-center text-text/md/medium text-black">
        Quay lại{" "}
        <Link
          to={"sign-in"}
          className="text-primary text-text/md/semibold underline"
        >
          đăng nhập
        </Link>
      </div> */}
    </div>
  );
}

export default ResetPassword;
