import PurpleLine from "@/assets/PurpleLine";
import DashboardCard from "./DashboardCard";
import NumberChange from "./NumberChange";
import TurquoiseLine from "@/assets/TurquoiseLine";
import YellowLine from "@/assets/YellowLine";
import BlueLine from "@/assets/BlueLine";
import { ChooseDayComboBox } from "./ChooseDay";

const statsData = [
  { label: "Số học viên mới", value: "2,3K", change: "+3.4%" },
  { label: "Số giảng viên mới", value: "2,3K", change: "+3.4%" },
  { label: "Số khóa học mới", value: "1,1K", change: "-3.4%" },
  { label: "Số khóa học được mua", value: "2,3K", change: "+3.4%" }
  // Add more items as needed
];

const StatsGrid = () => {
  return (
    <div className="bg-white border rounded-2xl shadow-sm border-gray-300 p-7">
      <div>
        <div className="flex w-full justify-between items-center gap-[10px]">
          <h2 className="text-text/xl/medium text-black-300 uppercase">
            Cơ hội
          </h2>
          <ChooseDayComboBox />
        </div>
        <div className="flex justify-start items-center gap-1">
          <p className="text-display/lg/medium text-black">8,0K</p>
          <NumberChange change="+3.4%" />
        </div>
        <div className="flex gap-2 item-center mt-[19px]">
          <PurpleLine />
          <TurquoiseLine />
          <YellowLine />
          <BlueLine />
        </div>
      </div>
      <div className="mt-[36px] grid grid-cols-2 gap-3">
        {statsData.map((stat, index) => (
          <div key={index}>
            <DashboardCard
              value={stat.value}
              label={stat.label}
              change={stat.change}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
