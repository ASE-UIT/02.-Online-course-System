import { useState } from "react";
import { studentChangePassword } from "../../api/studentApi";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PasswordTab = () => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: <span style={{ color: "red" }}>Có lỗi xảy ra</span>,
        description: "Mật khẩu mới không khớp",
        status: "error"
      });
      return;
    }
    try {
      setLoading(true);
      await studentChangePassword(currentPassword, newPassword);
      toast({
        title: <span style={{ color: "darkgreen" }}>Thành công</span>,
        description: "Đổi mật khẩu thành công",
        status: "success"
      });
    } catch (error) {
      toast({
        title: <span style={{ color: "red" }}>Có lỗi xảy ra</span>,
        description: error.response.data.message,
        status: "error"
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-text/xl/semibold mb-4">Đổi mật khẩu</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-black">Mật khẩu cũ</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              className="w-full p-2 border rounded-md"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-black">Mật khẩu mới</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full p-2 border rounded-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-black">Xác nhận mật khẩu mới</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full p-2 border rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
};

export default PasswordTab;
