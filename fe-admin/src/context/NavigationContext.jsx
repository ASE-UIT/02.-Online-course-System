import { createContext, useContext, useState } from "react";
import {
  LayoutDashboard,
  UserRoundCog,
  Users,
  Building2,
  Settings
} from "lucide-react";

export const menuItems = [
  {
    icon: LayoutDashboard,
    text: "Bảng điều khiển",
    id: "dashboard",
    path: "/admin/"
  },
  {
    icon: UserRoundCog,
    text: "Quản lý người dùng",
    id: "users",
    path: "users"
  },
  {
    icon: Users,
    text: "Quản lý nhân viên",
    id: "employees",
    path: "employees"
  },
  {
    icon: Building2,
    text: "Quản lý doanh nghiệp",
    id: "business",
    path: "business"
  },
  { icon: Settings, text: "Cài đặt", id: "settings", path: "setting" }
];

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <NavigationContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
