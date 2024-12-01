import { useNavigation, menuItems } from "@/context/NavigationContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { activeItem, setActiveItem } = useNavigation();

  return (
    <div className="z-50 w-full bg-white shadow-md ">
      <nav className="flex-1 px-5 py-[10px]">
        <ul className="space-x-1 flex flex-row items-start">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link to={`${item.path}`}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm ${
                    activeItem === item.id
                      ? "border-b-2 border-primary-500 text-primary-500"
                      : "text-black hover:bg-gray-400"
                  }`}
                >
                  <item.icon size={20} className="font-light" />
                  <span className="text-text/md/medium">{item.text}</span>
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* <div className="py-4 px-5">
        <div className="flex justify-between items-center gap-3">
          <div className="flex gap-1">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <div className="text-sm font-medium">Kiet Tran</div>
              <div className="text-sm font-medium">|</div>
              <div className="text-sm font-medium">Admin</div>
            </div>
          </div>
          <div>
            <LogOutIcon className="w-6 h-6 text-error-700" />
          </div>
        </div>
      </div> */}
    </div>
  );
}
