import { useNavigation, menuItems } from "@/context/NavigationContext";

export default function Header() {
  const { activeItem } = useNavigation();
  const currentPage = menuItems.find((item) => item.id === activeItem);

  return (
    <header className="p-5 bg-white border rounded-xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] ">
      <div className="flex flex-[1_0_0] items-center justify-between">
        <h1 className="text-display/md/medium">{currentPage?.text}</h1>

        <div className="relative text-black">
          <input
            type="text"
            placeholder="Tìm kiếm gì đó"
            className="placeholder-black w-[400px] px-4 py-3 text-black text/md/regular border border-black-300 rounded-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
        </div>
      </div>
    </header>
  );
}
