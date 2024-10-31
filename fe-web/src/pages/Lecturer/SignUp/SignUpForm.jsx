import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const SignUpForm = () => {
  const navigate = useNavigate();
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
    navigate(`/web/sign-up/step2/email`);
  }

  return (
    <div className="flex px-10 flex-col align-center gap-5 flex-1">
      <>
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-display/lg/semibold text-black">Đăng ký</h2>
          <p className="text-text/md/regular text-[#747474]">
            Khám phá cộng đồng hỗ trợ bao gồm nhiều giảng viên online. Được phép
            sử dụng ngay tất cả các tài nguyên sáng tạo khóa học.
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
              type="submit"
              className="w-full mt-5 rounded-xl shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)]"
            >
              Tiếp tục
            </Button>
          </form>
        </Form>
      </>
      <div className="text-center text-text/md/medium text-black">
        Đã có tài khoản?{" "}
        <Link
          to="/web/sign-in"
          className="text-primary text-text/md/semibold underline"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
