/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import {
  LayoutDashboard,
  Layers,
  Users,
  Building2,
  School,
  HandCoins,
  Package
} from "lucide-react";

export const menuItems = [
  {
    icon: LayoutDashboard,
    text: "Bảng điều khiển",
    id: "dashboard",
    path: "dashboard"
  },
  {
    icon: Layers,
    text: "Quản lý danh mục",
    id: "courses",
    path: "courses",
    subItems: [
      {
        text: "Danh sách danh mục",
        id: "categoryList",
        path: "courses/category-list"
      },
      {
        text: "Khoá học chờ duyệt",
        id: "categoryList",
        path: "courses/waiting-course"
      }
    ]
  },
  {
    icon: School,
    text: "Quảng lý giảng viên",
    id: "teacher",
    path: "teacher",
    subItems: [
      {
        text: "Danh sách giảng viên",
        id: "teacherList",
        path: "teacher/list"
      },
      {
        text: "Đăng ký giảng viên",
        id: "teacherRegistration",
        path: "teacher/registration"
      }
    ]
  },
  {
    icon: Users,
    text: "Quản lý hân viên",
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
    icon: Package,
    text: "Quản lý đơn hàng",
    id: "order",
    path: "order"
  },
  {
    icon: HandCoins,
    text: "Doanh thu",
    id: "revenue",
    path: "revenue",
    subItems: [
      {
        text: "Doanh thu tổng quan",
        id: "overall",
        path: "overall"
      },
      {
        text: "Theo khoá học",
        id: "byCourse",
        path: "byCourse"
      },
      {
        text: "Theo giảng viên",
        id: "byTeacher",
        path: "byTeacher"
      }
    ]
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
