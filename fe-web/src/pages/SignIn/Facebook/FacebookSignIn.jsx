/* eslint-disable no-undef */
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addAuth } from "@/store/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { FacebookIcon } from "@/assets";
import config from "@/config";

function CustomFacebookSignIn() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: config.REACT_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v10.0"
      });
    };

    // Load the Facebook SDK script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFacebookLogin = () => {
    FB.login(
      function (response) {
        if (response.authResponse) {
          const token = response.authResponse.accessToken;
          // Dispatch token to Redux store
          dispatch(addAuth({ token }));
          // Navigate to home page
          navigate("/");
          // Show success toast
          toast({
            title: <p className="text-green-700">Đăng nhập thành công</p>,
            description: "Chào mừng bạn trở lại",
            status: "success",
            duration: 2000
          });
        } else {
          toast({
            title: <p className="text-red-700">Đăng nhập thất bại</p>,
            description: "Lỗi không xác định",
            duration: 2000
          });
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-full flex rounded-xl"
      onClick={handleFacebookLogin}
    >
      <div className="pl-4">
        <FacebookIcon />
      </div>
      <span className="text-text/md/semibold w-full">Facebook</span>
    </Button>
  );
}

export default CustomFacebookSignIn;
