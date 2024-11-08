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
export default function SideBar() {
  const handleNavigation = (hash) => {
    window.location.hash = hash;
  };
  const location = useLocation();
  const hash = location.hash;
  return (
    <div className="px-[24px] py-[18px]">
      <div
        className="w-[375px] h-[317px] mb-2"
        style={{
          backgroundImage: `url(https://s3-alpha-sig.figma.com/img/7f12/ea13/00756f144a0fb5daaf68dbfc01103a46?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VnrxqbOLitZIq39Z6BVS5E3d-KPFE-q3nLjiNuJUlOepndGGaouqx3~2h3ibYCg~0rgw669zyYfCtjz5fshWSdbWZBkXMDfkHpECKFn~thRPTif7fUC1Au4K4ABAfLHgK4mp8BX6jEJW0yAkY1JaxKuaT5YkpsO-SFagW~LPI6fzYoAKk4ah2zzbXuv-76OuPT5VP1mJZZF4S12vJe-EtOODXu13EnRyEb-VRJaBTtMj3QvvUBedFZ7WYvfDBLbXcb4C2nznqrM2GcD00gk7Ft1Etn-LvR6sCZcZahcvbv3QLS1uO~tmsbienArwDs5YApI94fSJgsnX40bINKXozw__)`,
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
