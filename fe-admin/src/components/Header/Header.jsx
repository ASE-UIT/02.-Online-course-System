import { Bell, MenuIcon } from "lucide-react";
import Searchbar from "../Searchbar/Searchbar";
import DropdownUser from "./DropdownUser";

export default function Header() {
  return (
    <header className="p-5 max-h-[84px] bg-white rounded-xl shadow-[0px_8px_15.9px_0px_rgba(0,0,0,0.07)]">
      <div className="flex flex-[1_0_0] gap-3 items-center justify-between">
        <MenuIcon className="w-6 h-6" />
        <Searchbar placeholder={"Tìm kiếm gì đó"} />
        <Bell className="w-6 h-6" />
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <DropdownUser />
        </div>
      </div>
    </header>
  );
}