import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const VerifyCode = () => {
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

  return (
    <div className="text-center">
      <h2 className="text-display/lg/semibold mb-3">Xác thực email</h2>
      <p className="text-text/md/regular mb-5">
        Chúng tôi đã gửi cho bạn một liên kết để xác thực email tài khoản. Vui
        lòng nhấn vào đường link được gửi trong email để hoàn tất quá trình tạo
        tài khoản.
      </p>
      <Button
        disabled={countdown > 0}
        className={`w-full rounded-xl text-text/md/semibold shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)] disabled:opacity-100 disabled:shadow-none ${
          countdown > 0
            ? "bg-primary-50 text-primary-700"
            : "bg-primary text-white"
        }`}
        onClick={handleResendEmail}
      >
        {countdown > 0
          ? `Gửi lại email sau ${countdown} giây`
          : "Gửi lại email"}
      </Button>
    </div>
  );
};

export default VerifyCode;
