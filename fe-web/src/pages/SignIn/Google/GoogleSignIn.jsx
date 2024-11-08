import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addAuth } from "@/store/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { GoogleIcon } from "@/assets";
import axios from "axios";
import config from "@/config";

function CustomGoogleSignIn() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const idToken = tokenResponse.id_token;
      try {
        const response = await axios.post(
          `${config.BASE_URL}/student/auth/google/callback`,
          {
            idToken
          }
        );
        const { token } = response.data;
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
      } catch (error) {
        console.error("error", error);
        toast({
          title: <p className="text-red-700">Đăng nhập thất bại</p>,
          description: "Lỗi không xác định",
          duration: 2000
        });
      }
    },
    onError: () => {
      toast({
        title: <p className="text-red-700">Đăng nhập thất bại</p>,
        description: "Lỗi không xác định",
        duration: 2000
      });
    }
  });

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-full flex rounded-xl"
      onClick={() => login()}
    >
      <div className="pl-4">
        <GoogleIcon />
      </div>
      <span className="text-text/md/semibold w-full">Google</span>
    </Button>
  );
}

export default CustomGoogleSignIn;
