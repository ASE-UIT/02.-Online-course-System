import { menuItems } from "@/context/NavigationContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="z-50 w-full max-h-[86px] bg-white shadow-md ">
      <nav className="flex-1 px-5 py-[10px]">
        <ul className="space-x-1 flex flex-row items-start">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link to={`${item.path}`}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm ${
                    location.pathname.includes(item.path)
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
    </div>
  );
}
