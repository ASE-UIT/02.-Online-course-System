import { useEffect } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail } from "lucide-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "@/config";
import CustomGoogleSignIn from "../SignIn/Google/GoogleSignIn";
import CustomFacebookSignIn from "../SignIn/Facebook/FacebookSignIn";

function SignUpForm() {
  const { signUpType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (signUpType !== "phone" && signUpType !== "email") {
      navigate("/sign-up/step1/email");
    }
  }, [navigate, signUpType]);

  return (
    <div className="flex px-10 flex-col align-center gap-5 flex-1">
      <Outlet />
      <div className="text-center text-text/md/medium text-black">
        Đã có tài khoản?{" "}
        <Link
          to="/web/sign-in"
          className="text-primary text-text/md/semibold underline"
        >
          Đăng nhập ngay
        </Link>
      </div>
      <div className="relative my-2.5 flex justify-center text-black-300">
        <Separator className="w-full" />
        <span className="absolute -top-2.5 bg-white px-5 text-text/sm/regular">
          Hoặc đăng ký với
        </span>
      </div>
      <div className="flex flex-col gap-5">
        {signUpType == "email" ? (
          <Link to={"/web/sign-up/step1/phone"}>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="w-full flex rounded-xl"
            >
              <div className="pl-4">
                <Phone />
              </div>
              <span className="text-text/md/semibold w-full">
                Số điện thoại
              </span>
            </Button>
          </Link>
        ) : (
          <Link to={"/web/sign-up/step1/email"}>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="w-full flex rounded-xl"
            >
              <div className="pl-4">
                <Mail />
              </div>
              <span className="text-text/md/semibold w-full">Email</span>
            </Button>
          </Link>
        )}
        <div className="flex gap-2">
          <div className="w-1/2">
            <GoogleOAuthProvider clientId={config.REACT_APP_GOOGLE_CLIENT_ID}>
              <CustomGoogleSignIn />
            </GoogleOAuthProvider>
          </div>
          <div className="w-1/2">
            <CustomFacebookSignIn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
