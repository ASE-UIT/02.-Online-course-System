import { Search } from "lucide-react";
import { useNavigation, menuItems } from "@/context/NavigationContext";

export default function Header() {
  const { activeItem } = useNavigation();
  const currentPage = menuItems.find((item) => item.id === activeItem);

  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{currentPage?.text}</h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm gì đó"
            className="w-[400px] pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
