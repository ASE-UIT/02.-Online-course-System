import { useDispatch } from "react-redux";
import { addAuth } from "@/store/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "@/config";
import { GoogleIcon } from "@/assets";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

function CustomGoogleSignIn() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.gapi.load("auth2", () => {
      const auth2 = window.gapi.auth2.init({
        client_id: config.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "profile email openid"
      });

      auth2.attachClickHandler(
        document.getElementById("custom-google-btn"),
        {},
        async (googleUser) => {
          const idToken = googleUser.getAuthResponse().id_token;
          console.log("gg response", googleUser.getAuthResponse());

          try {
            const response = await axios.post(
              `${config.BASE_URL}/student/auth/google/callback`,
              { idToken }
            );
            const { token } = response.data;
            dispatch(addAuth({ token }));
            navigate("/");
            toast({
              title: <p className="text-green-700">Đăng nhập thành công</p>,
              description: "Chào mừng bạn trở lại",
              status: "success",
              duration: 2000
            });
          } catch (error) {
            console.error("error", error);
            toast({
              title: <p className="text-red-700">Đăng nhập thất bại</p>,
              description: "Lỗi không xác định",
              duration: 2000
            });
          }
        },
        (error) => {
          console.error("Sign-in error", error);
          toast({
            title: <p className="text-red-700">Đăng nhập thất bại</p>,
            description: "Lỗi không xác định",
            duration: 2000
          });
        }
      );
    });
  }, [dispatch, navigate, toast]);

  return (
    <div className="z-50">
      <Button
        id="custom-google-btn"
        variant="outline"
        size="icon"
        className="w-full flex rounded-xl hover:bg-black-100 border-2"
      >
        <div className="pl-2 pr-1">
          <GoogleIcon className="w-3 h-3" />
        </div>
        <span className="text-text/sm/regular w-full">Google</span>
      </Button>
    </div>
  );
}

export default CustomGoogleSignIn;
