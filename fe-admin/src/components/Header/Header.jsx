import { Bell, MenuIcon, Search, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="p-5 max-h-[84px] bg-white rounded-xl shadow-[0px_8px_15.9px_0px_rgba(0,0,0,0.07)]">
      <div className="flex flex-[1_0_0] gap-3 items-center justify-between">
        <MenuIcon className="w-6 h-6" />
        <div className="w-full relative px-2 py-2 flex items-center gap-2 text-black border border-gray-500 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <Search className="text-black-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm gì đó"
            className="placeholder-black w-full text-black text/md/regular focus:outline-none"
          />
        </div>
        <Bell className="w-6 h-6" />
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <UserCircle className="w-10 h-10 text-gray-600" />
        </div>
      </div>
    </header>
  );
}
