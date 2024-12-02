import { User } from "lucide-react"; // Adjust the import based on your icon library
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

const DropdownUser = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-center items-center">
          <User className="p-2 w-10 h-10 text-white cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleLogout}>Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownUser;
