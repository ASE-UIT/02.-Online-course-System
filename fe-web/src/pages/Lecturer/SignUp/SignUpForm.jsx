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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { registerLecturer } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { addSignUpData } from "@/store/slices/signUpSlice";

const formSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Họ phải có ít nhất 2 ký tự."
    }),
    bio: z.string().min(0),
    email: z.string().email({
      message: "Email không hợp lệ."
    }),
    phone: z.string().min(10, {
      message: "Số điện thoại phải có ít nhất 10 ký tự."
    }),
    sampleVideoLink: z.string().url({
      message: "Link video không hợp lệ."
    }),
    socialMediaLink: z.string().url({
      message: "Link mạng xã hội không hợp lệ."
    }),
    teachingTopic: z.string().min(1, {
      message: "Chủ đề giảng dạy không được để trống."
    }),
    teachingExperience: z.string().min(1, {
      message: "Kinh nghiệm giảng dạy không được để trống."
    }),
    password: z.string().min(6, {
      message: "Mật khẩu phải có ít nhất 6 ký tự."
    }),
    confirmPassword: z.string(),
    address: z.string().min(1, {
      message: "Địa chỉ không được để trống."
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp.",
    path: ["confirmPassword"]
  });

const SignUpForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: " ",
      bio: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      sampleVideoLink: "",
      socialMediaLink: "",
      teachingTopic: "",
      teachingExperience: ""
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (phone) => {
    if (phone.startsWith("0")) {
      return `+84${phone.slice(1)}`;
    }
    return phone;
  };

  async function onSubmit(values) {
    setIsLoading(true);
    const phoneNumber = formatPhoneNumber(values.phone);

    try {
      const reponse = await registerLecturer(
        values.fullName,
        values.email,
        phoneNumber,
        values.address,
        values.bio,
        values.password,
        values.sampleVideoLink,
        values.socialMediaLink,
        values.teachingTopic,
        values.teachingExperience
      );

      if (reponse.code === 200) {
        toast({
          title: <p className="text-green-700">Thành công</p>,
          description: "Đăng ký thành công, hãy xác thực số điện thoại của bạn",
          status: "success",
          duration: 2000
        });
        dispatch(addSignUpData(values));
      }
      navigate(`step2/phone/${phoneNumber}`);
    } catch (error) {
      console.log("error", error);
      if (
        error.response.data?.errors.code === "BAD_REQUEST" ||
        error.status === 400
      ) {
        toast({
          title: <p className="text-red-700">Có lỗi xảy ra</p>,
          description: error.response.data.errors.msg,
          duration: 2000
        });
        dispatch(addSignUpData(values));

        navigate(`step2/phone/${phoneNumber}`);
      } else {
        console.log("else error");
        toast({
          title: <p className="text-red-700">Có lỗi xảy ra</p>,
          description: "Lỗi không xác định",
          duration: 2000
        });
      }
    }
    setIsLoading(false);
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Họ tên<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-600"
                        autoComplete="name"
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
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Chức danh
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
            <div className="grid grid-cols-2 gap-5">
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-text/md/medium">
                      Số điện thoại<span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-600"
                        autoComplete="phone"
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
              name="sampleVideoLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Link video mẫu<span className="text-error-500">*</span>
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
              control={form.control}
              name="socialMediaLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Liên kết mạng xã hội
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
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Địa chỉ<span className="text-error-500">*</span>
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
              control={form.control}
              name="teachingTopic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Chủ đề giảng dạy<span className="text-error-500">*</span>
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
                    Nhập lại mật khẩu<span className="text-error-500">*</span>
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
              name="teachingExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text/md/medium">
                    Kinh nghiệm giảng dạy
                    <span className="text-error-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-gray-600"
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
          to="../sign-in"
          className="text-primary text-text/md/semibold underline"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
