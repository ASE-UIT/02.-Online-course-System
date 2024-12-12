/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import {
  LayoutDashboard,
  Layers,
  UserRoundCog,
  Users,
  Building2,
  School,
  BaggageClaim,
  ChartNoAxesCombined
} from "lucide-react";

export const menuItems = [
  {
    icon: LayoutDashboard,
    text: "Bảng điều khiển",
    id: "dashboard",
    path: "dashboard"
  },
  {
    icon: ChartNoAxesCombined,
    text: "Báo cáo",
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
  },
  {
    icon: Layers,
    text: "Khoá học",
    id: "courses",
    path: "courses/category-list",
    subItems: [
      {
        text: "Danh sách danh mục",
        id: "categoryList",
        path: "courses/category-list"
      },
      {
        text: "Danh sách khoá học",
        id: "courseList",
        path: "courses/list"
      },
      {
        text: "Khoá học chờ duyệt",
        id: "categoryList",
        path: "courses/category-list"
      },
      {
        text: "Thu nhập từ khoá học",
        id: "categoryList",
        path: "courses/category-list"
      }
    ]
  },
  {
    icon: School,
    text: "Giảng viên",
    id: "teacher",
    path: "teacher/list",
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
      },
      {
        text: "Thu nhập của giảng viên",
        id: "teacherIncome",
        path: "teacher/income"
      }
    ]
  },
  {
    icon: Users,
    text: "Nhân viên",
    id: "employees",
    path: "employees"
  },
  {
    icon: UserRoundCog,
    text: "Phân quyền",
    id: "users",
    path: "users"
  },
  {
    icon: Building2,
    text: "Doanh nghiệp",
    id: "business",
    path: "business"
  },
  {
    icon: BaggageClaim,
    text: "Danh sách đơn hàng",
    id: "order",
    path: "order"
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
