import { useNavigation, menuItems } from "@/context/NavigationContext";
import LogoIcon from "@/assets/LogoIcon";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { activeItem, setActiveItem } = useNavigation();

  return (
    <div className=" z-50 w-80 bg-white shadow-md h-screen flex flex-col">
      <div className="pt-10 ">
        <div className="w-full flex justify-center items-center gap-1">
          <LogoIcon className=" text-blue-600 w-[143px] h-[33px]" />
          <div className="flex items-end h-full">
            <p className="text/md/regular text-black ml-1 mb-[-10px]">
              Admin Portal
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-5 py-[60px]">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link to={`${item.path}`}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
                    activeItem === item.id
                      ? "bg-primary-500 text-white"
                      : "text-black hover:bg-gray-400"
                  }`}
                >
                  <item.icon size={20} className="font-light" />
                  <span className="text-sm font-medium">{item.text}</span>
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
