import PurpleLine from "@/assets/PurpleLine";
import DashboardCard from "../DashboardCard";
import NumberChange from "./NumberChange";
import TurquoiseLine from "@/assets/TurquoiseLine";
import YellowLine from "@/assets/YellowLine";
import BlueLine from "@/assets/BlueLine";
import { ChooseDayComboBox } from "./ChooseDay";

const StatsGrid = ({ timePeriod, setTimePeriod, information }) => {
  console.log("🚀 ~ StatsGrid ~ information:", information);
  const formatNumber = (num) =>
    typeof num === "number" ? num.toFixed(1) : num;

  const statsData = [
    {
      label: "Số học viên mới",
      value: formatNumber(information?.newStudents ?? 0),
      change: `${formatNumber(information?.newStudentsPercentage ?? 0)}%`
    },
    {
      label: "Số giảng viên mới",
      value: formatNumber(information?.newLecturer ?? 0),
      change: `${formatNumber(information?.newLecturerPercentage ?? 0)}%`
    },
    {
      label: "Số khóa học mới",
      value: formatNumber(information?.newCourses ?? 0),
      change: `${formatNumber(information?.newCoursesPercentage ?? 0)}%`
    },
    {
      label: "Số khóa học được mua",
      value: formatNumber(information?.coursesPurchased ?? 0),
      change: `${formatNumber(information?.coursesPurchasedPercentage ?? 0)}%`
    },
    {
      label: "SỐ LƯỢT ĐÁNH GIÁ KHOÁ HỌC",
      value: formatNumber(information?.courseRatings ?? 0),
      change: `${formatNumber(information?.courseRatingsPercentage ?? 0)}%`
    },
    {
      label: "ĐÁNH GIÁ TRUNG BÌNH CỦA KHOÁ HỌC",
      value: `${formatNumber(information?.averageRating ?? 0)} sao`,
      change: `${formatNumber(information?.averageRatingPercentage ?? 0)}%`
    }
  ];

  return (
    <div className="bg-white border rounded-2xl shadow-sm border-gray-300 p-7">
      <div>
        <div className="flex w-full justify-between items-center gap-[10px]">
          <h2 className="text-text/xl/medium text-black-300 uppercase">
            CƠ HỘI
          </h2>
          <ChooseDayComboBox value={timePeriod} setValue={setTimePeriod} />
        </div>
        <div className="flex justify-start items-center gap-1">
          <p className="text-display/lg/medium text-black"> {"8.0K"}</p>
          <NumberChange change="+3.4%" />
        </div>
        <div className="flex gap-2 item-center mt-[19px]">
          <PurpleLine />
          <TurquoiseLine />
          <YellowLine />
          <BlueLine />
        </div>
      </div>
      <div className="mt-[72px] grid grid-cols-2 gap-6">
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
