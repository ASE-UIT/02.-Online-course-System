import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OTPInput from "@/components/OTPInput";

const EmailTitle =
  "Chúng tôi đã gửi cho bạn một mã OTP để xác thực email tài khoản. Vui lòng nhập OTP được gửi trong email để hoàn tất quá trình tạo tài khoản.";
const PhoneTitle =
  "Chúng tôi đã gửi cho bạn một tin nhắn chứa OTP để xác thực số điện thoại tài khoản. Vui lòng nhập vào OTP được gửi trong tin nhắn để hoàn tất quá trình tạo tài khoản.";
const EmailSendText = "Chưa nhận được email?";
const PhoneSendText = "Chưa nhận được tin nhắn?";

const VerifyCode = () => {
  const { signUpType } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = () => {
    // TODO: Implement email resend logic here
    console.log("Resending email...");
    setCountdown(10);
  };

  const handleVerifyCode = () => {
    navigate(`/result/${signUpType}`);
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
        <OTPInput />
      </div>
      <div className="flex gap-2 justify-center text-center text-text/md/medium text-black mb-5">
        {signUpType === "email" ? EmailSendText : PhoneSendText}
        <button
          disabled={countdown > 0}
          className="text-primary text-text/md/semibold cursor-pointer"
          onClick={handleResendEmail}
        >
          {signUpType === "email" ? "Gửi lại email" : "Gửi lại tin nhắn"}
          {countdown > 0 && ` sau ${countdown} giây`}
        </button>
      </div>
      <Button
        onClick={() => handleVerifyCode()}
        className="w-full text-white rounded-xl shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)] disabled:opacity-100 disabled:shadow-none"
      >
        Xác thực
      </Button>
    </div>
  );
};

export default VerifyCode;
