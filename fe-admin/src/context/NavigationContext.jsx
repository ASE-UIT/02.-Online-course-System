/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import {
  LayoutDashboard,
  Layers,
  UserRoundCog,
  Users,
  Building2
} from "lucide-react";

export const menuItems = [
  {
    icon: LayoutDashboard,
    text: "Bảng điều khiển",
    id: "dashboard",
    path: "/admin/"
  },
  {
    icon: Layers,
    text: "Quản lý danh mục",
    id: "categories",
    path: "categories"
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
  {
    icon: UserRoundCog,
    text: "Quản lý người dùng",
    id: "users",
    path: "users"
  }
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
