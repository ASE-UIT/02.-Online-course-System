import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";
import { studentLogin } from "@/api";
import { addAuth } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import config from "@/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignIn from "./Google/GoogleSignIn";
import CustomFacebookSignIn from "./Facebook/FacebookSignIn";

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
  const dispatch = useDispatch();
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
    const { email, password } = values;
    const respone = await studentLogin(email, password);

    if (respone.status === 200 || respone.data.code === 200) {
      console.log("respone.data", respone.data.data.token);
      const token = respone.data.data.token;
      dispatch(
        addAuth({
          token
        })
      );
      navigate("/");
      toast({
        title: <p className=" text-green-700">Đăng nhập thành công</p>,
        description: "Chào mừng bạn trở lại",
        status: "success",
        duration: 2000
      });
    } else if (respone.errors?.code === "NF_01") {
      form.setError("password", {
        message: respone.errors.msg
      });
    } else {
      toast({
        title: <p className=" text-red-700">Đăng nhập thất bại</p>,
        description: "Lỗi không xác định",
        duration: 2000
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="flex px-10 flex-col align-center gap-5 flex-1">
      <>
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-display/lg/semibold text-black">Đăng nhập</h2>
          <p className="text-text/md/regular text-[#747474]">
            Đăng nhập để tiếp tục con đường tri thức của bạn
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                      autoComplete="email"
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
                      autoComplete="current-password"
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
      <div className="text-center text-text/md/medium text-black">
        Chưa có tài khoản?{" "}
        <Link
          to="/web/sign-up/step1/email"
          className="text-primary text-text/md/semibold underline"
        >
          Đăng ký ngay
        </Link>
      </div>
      <div className="relative my-2.5 flex justify-center text-black-300">
        <Separator className="w-full" />
        <span className="absolute -top-2.5 bg-white px-5 text-text/sm/regular">
          Hoặc đăng nhập với
        </span>
      </div>
      <div className="flex flex-col gap-5">
        {/* <Button
          variant="outline"
          size="icon"
          className="w-full flex rounded-xl"
        >
          <div className="pl-4">
            <Phone />
          </div>
          <span className="text-text/md/semibold w-full">Số điện thoại</span>
        </Button> */}
        <div className="flex justify-center items-center gap-5">
          <GoogleOAuthProvider clientId={config.REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleSignIn />
          </GoogleOAuthProvider>
          <CustomFacebookSignIn />
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
