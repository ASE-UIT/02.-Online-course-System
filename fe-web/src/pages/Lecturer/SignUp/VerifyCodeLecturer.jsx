import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OTPInput from "@/components/OTPInput";
import {
  registerLecturer,
  studentForgotPassword,
  studentVerifyEmail,
  studentVerifyOtp,
  verifyLecturer
} from "@/api";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";

const EmailTitle =
  "Chúng tôi đã gửi cho bạn một mã OTP để xác thực email tài khoản. Vui lòng nhập OTP được gửi trong email để hoàn tất quá trình tạo tài khoản.";
const PhoneTitle =
  "Chúng tôi đã gửi cho bạn một tin nhắn chứa OTP để xác thực số điện thoại tài khoản. Vui lòng nhập vào OTP được gửi trong tin nhắn để hoàn tất quá trình tạo tài khoản.";
const EmailSendText = "Chưa nhận được email?";
const PhoneSendText = "Chưa nhận được tin nhắn?";

const VerifyCodeLecturer = () => {
  const { signUpType, emailOrPhone } = useParams();
  const url = useLocation();
  const { toast } = useToast();
  const signUpData = useSelector((state) => state.signUp);

  const navigate = useNavigate();
  const isForgotPassword = url.pathname.includes("sign-in");
  const [countdown, setCountdown] = useState(180);
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (signUpData === null) {
      navigate("/web/lecturer/sign-up");
    }
  }, [signUpData, navigate, signUpType]);

  const handleResendEmail = async () => {
    // TODO: Implement email resend logic here
    setIsLoading(true);
    if (isForgotPassword) {
      try {
        const response = await studentForgotPassword(emailOrPhone);
        if (response.data.code === 200) {
          toast({
            title: <p className="text-green-700">Thành công</p>,
            description: "OTP đã được gửi để đặt lại mật khẩu",
            status: "success",
            duration: 2000
          });
        }
      } catch (error) {
        toast({
          title: <p className="text-red-700">Có lỗi xảy ra</p>,
          description: error.response.data.errors.msg,
          duration: 2000
        });
      }
    } else {
      try {
        const reponse = await registerLecturer(
          signUpData.fullName,
          signUpData.email,
          signUpData.phone,
          signUpData.address,
          signUpData.bio,
          signUpData.password,
          signUpData.sampleVideoLink,
          signUpData.socialMediaLink,
          signUpData.teachingTopic,
          signUpData.teachingExperience
        );

        if (reponse.code === 200) {
          toast({
            title: <p className="text-green-700">Thành công</p>,
            description: "Gửi lại tin nhắn thành công",
            status: "success",
            duration: 2000
          });
        }
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
        } else {
          console.log("else error");
          toast({
            title: <p className="text-red-700">Có lỗi xảy ra</p>,
            description: "Lỗi không xác định",
            duration: 2000
          });
        }
      }
    }

    setCountdown(180);
    setIsLoading(false);
  };

  const handleForgotPasswordCode = async (otpFromInput) => {
    let otpValue = otp.join("");
    if (emailOrPhone === null) {
      navigate(`/web/sign-in`);
    } else if (signUpType === "email") {
      try {
        const response = await studentVerifyOtp(
          emailOrPhone,
          otpFromInput ?? otpValue
        );

        if (response.data.code === 200) {
          navigate(`/web/sign-in/reset-password/${emailOrPhone}/${otpValue}`);
        }
      } catch (error) {
        if (error.response.data.errors?.code === "INVALID_OTP") {
          toast({
            title: <p className=" text-red-700">Có lỗi xảy ra</p>,
            description: error.response.data.errors.msg,
            duration: 2000
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
    }
  };

  const handleVerifyCode = async (otpFromInput) => {
    let otpValue = otp.join("");
    if (emailOrPhone === null) {
      navigate(`/web/sign-up/step1/email`);
    } else if (signUpType === "email") {
      try {
        const response = await studentVerifyEmail(
          emailOrPhone,
          otpFromInput ?? otpValue
        );

        if (response.data.code === 200) {
          navigate(`/web/result/${signUpType}`);
        }
      } catch (error) {
        toast({
          title: <p className="text-red-700">Có lỗi xảy ra</p>,
          description: error.response.data.errors.msg ?? "Xác thực thất bại",
          status: "error",
          duration: 2000
        });
      }
    } else {
      try {
        const phoneNumber = emailOrPhone.slice(1);
        const response = await verifyLecturer(phoneNumber, otpValue);

        if (response.data.code === 200) {
          navigate(`/web/lecturer/result`);
        }
      } catch (error) {
        toast({
          title: <p className="text-red-700">Có lỗi xảy ra</p>,
          description: error.response.data.errors.msg ?? "Xác thực thất bại",
          status: "error",
          duration: 2000
        });
      }
    }
    // navigate(`/web/result/${signUpType}`);
  };

  return (
    <div className="text-center">
      <h2 className="text-display/lg/semibold mb-3">
        {signUpType === "email" ? "Xác thực email" : "Xác thực SĐT"}
      </h2>
      <p className="text-text/md/regular mb-5">
        {signUpType === "email" ? EmailTitle : PhoneTitle}
      </p>
      <div className="w-full flex justify-center items-center mb-5">
        <OTPInput
          length={otpLength}
          otp={otp}
          setOtp={setOtp}
          onComplete={handleVerifyCode}
        />
      </div>
      <div className="flex gap-2 justify-center text-center text-text/md/medium text-black mb-5">
        {signUpType === "email" ? EmailSendText : PhoneSendText}
        <button
          disabled={countdown > 0 || isLoading}
          className="text-primary text-text/md/semibold cursor-pointer"
          onClick={handleResendEmail}
        >
          {signUpType === "email" ? "Gửi lại email" : "Gửi lại tin nhắn"}
          {countdown > 0 && ` sau ${countdown} giây`}
        </button>
      </div>
      <Button
        disabled={isLoading}
        onClick={() => {
          isForgotPassword ? handleForgotPasswordCode() : handleVerifyCode();
        }}
        className="w-full text-white rounded-xl shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)] disabled:opacity-100 disabled:shadow-none"
      >
        Xác thực
      </Button>
    </div>
  );
};

export default VerifyCodeLecturer;
