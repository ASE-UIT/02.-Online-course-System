import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { studentForgotPassword } from "@/api";
import { isEmail } from "@/utils/checkEmailOrPhone";

const formSchema = z.object({
  emailOrPhone: z.string().min(6, {
    message: "Email hoặc số điện thoại phải có ít nhất 6 ký tự."
  })
});

function ForgotPassword() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhone: ""
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values) {
    setIsLoading(true);
    const { emailOrPhone } = values;
    try {
      const respone = await studentForgotPassword(emailOrPhone);

      const verifyType = isEmail(emailOrPhone) ? "email" : "phone";

      if (respone.status === 200 || respone.data.code === 200) {
        console.log("respone.data", respone.data);
        navigate(`/web/sign-in/step2/${verifyType}/${emailOrPhone}`);
        toast({
          title: <p className=" text-green-700">Thành công</p>,
          description: "OTP đã được gửi để đặt lại mật khẩu",
          status: "success",
          duration: 2000
        });
      }
    } catch (respone) {
      if (respone.errors?.code === "INVALID_OTP") {
        console.log("respone.errors.INVALID_OTP", respone.errors);
        form.setError("emailOrPhone", {
          message: respone.errors.msg
        });
        setIsLoading(false);
      } else {
        toast({
          title: <p className=" text-red-700">Có lỗi xảy ra</p>,
          description: "Lỗi không xác định",
          duration: 2000
        });
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="flex px-10 flex-col align-center gap-5 flex-1">
      <>
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-display/lg/semibold text-black">Quên mật khẩu</h2>
          {/* <p className="text-text/md/regular text-[#747474]">
            Đăng nhập để tiếp tục con đường tri thức của bạn
          </p> */}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="emailOrPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Email/Số điện thoại
                    <span className="text-error-500">*</span>
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

export default ForgotPassword;
