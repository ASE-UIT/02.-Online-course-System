import { useEffect, useState } from "react";
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
import TextLogo from "@/assets/TextLogo";
import { employeeLogin } from "@/api";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  email: z.string().min(6, {
    message: "Email hoặc số điện thoại không đúng"
  }),
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự."
  })
});

function SignInForm() {
  const { toast } = useToast();
  const { login, checkLogin } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const { email, password } = values;
      const respone = await employeeLogin(email, password);

      if (respone.status === 200 || respone.data.code === 200) {
        console.log("respone.data", respone.data.data.token);
        const token = respone.data.data.token;

        login({
          token: token
        });

        navigate("/admin/");
        toast({
          title: <p className=" text-green-700">Đăng nhập thành công</p>,
          description: "Chào mừng bạn trở lại",
          status: "success",
          duration: 2000
        });
      }
    } catch (error) {
      console.log("error", error);
      if (error.status === 401 || error.response.data.code === 401) {
        form.setError("email", {
          message: "Email hoặc mật khẩu không đúng"
        });
      } else if (error.response.data?.code === 500) {
        form.setError("email", {
          message: "Không tìm thấy tài khoản"
        });
      } else {
        toast({
          title: <p className=" text-red-700">Đăng nhập thất bại</p>,
          description: "Lỗi không xác định",
          duration: 2000
        });
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (checkLogin()) {
      navigate("/admin/");
    }
  }, [checkLogin, navigate]);

  return (
    <div className="flex px-10 flex-col align-center gap-5 flex-1">
      <>
        <div className="text-center flex flex-col justify-center items-center gap-3">
          <TextLogo className="w-[240px] h-[56px]" />
          <p className="text-text/md/regular text-[#747474]">Admin Portal </p>
          <h2 className="text-display/lg/semibold text-black">Đăng nhập</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Email/ Số điện thoại
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
            <div>
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
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full mt-5 rounded-xl shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)]"
            >
              {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>
          </form>
        </Form>
      </>
    </div>
  );
}

export default SignInForm;
