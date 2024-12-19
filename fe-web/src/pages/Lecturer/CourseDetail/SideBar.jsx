import { BookCopyIcon, ChartColumnIcon, GiftIcon, InfoIcon, PlayIcon, TargetIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

const navItem = [
  {
    icon: <InfoIcon className="w-[24px] h-[24px]" />,
    label: "Thông tin cơ bản",
    hash: "",
  },
  {
    icon: <ChartColumnIcon className="w-[24px] h-[24px]" />,
    label: "Giá khoá học",
    hash: "#price",
  },
  {
    icon: <TargetIcon className="w-[24px] h-[24px]" />,
    label: "Mục tiêu khoá học",
    hash: "#target",
  },
  {
    icon: <BookCopyIcon className="w-[24px] h-[24px]" />,
    label: "Danh sách bài học",
    hash: "#lesson",
  },
  {
    icon: <PlayIcon className="w-[24px] h-[24px]" />,
    label: "Ảnh bìa và Video sale",
    hash: "#img&video",
  },
  {
    icon: <GiftIcon className="w-[24px] h-[24px]" />,
    label: "Tài liệu và quà tặng",
    hash: "#doc&gift",
  },
];
export default function SideBar({ course }) {
  const handleNavigation = (hash) => {
    window.location.hash = hash;
  };
  const location = useLocation();
  const hash = location.hash;
  return (
    <div className="px-[24px] py-[18px]">
      <div
        className="w-[375px] h-[317px] mb-2 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${course?.thumbnail || "https://via.placeholder.com/375x317"})`,
        }}
      ></div>
      {navItem.map((item, idx) => {
        return (
          <div
            key={`navitem-${idx}`}
            className={`px-[4px] cursor-pointer hover:bg-gray-200 py-[12px] flex items-center gap-[20px] ${
              hash === item.hash ? "text-black border-r-[4px] border-primary-500" : "text-black-300"
            } `}
            onClick={() => handleNavigation(item.hash)}
          >
            <div>{item.icon}</div>
            <p className="text-text/md/regular">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}
