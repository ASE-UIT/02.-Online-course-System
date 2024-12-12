import { menuItems } from "@/context/NavigationContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="z-50 w-full max-h-[86px] bg-white shadow-md">
      <nav className="flex-1 px-5 py-[10px]">
        <ul className="space-x-1 flex flex-row items-start">
          {menuItems.map((item) => (
            <li key={item.id} className="relative group">
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
                  {item.subItems && (
                    <svg
                      className="arrow ml-auto transform -rotate-90"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 19L5 12L12 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </Link>
              {item.subItems && (
                <ul className="sub-menu">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.id}>
                      <Link to={`${subItem.path}`}>
                        <button
                          onClick={() => navigate(subItem.path)}
                          className={`w-full flex items-center text-center gap-3 px-1 py-2 text-sm ${+"text-black hover:bg-gray-500"}`}
                        >
                          <span className="text-text/md/medium">
                            {subItem.text}
                          </span>
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
