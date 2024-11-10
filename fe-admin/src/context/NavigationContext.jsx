import { createContext, useContext, useState } from "react";
import {
  LayoutGrid,
  Users,
  UserCircle,
  Building2,
  Settings
} from "lucide-react";

export const menuItems = [
  { icon: LayoutGrid, text: "Bảng điều khiển", id: "dashboard" },
  { icon: Users, text: "Quản lý người dùng", id: "users" },
  { icon: UserCircle, text: "Quản lý nhân viên", id: "employees" },
  { icon: Building2, text: "Quản lý doanh nghiệp", id: "business" },
  { icon: Settings, text: "Cài đặt", id: "settings" }
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
