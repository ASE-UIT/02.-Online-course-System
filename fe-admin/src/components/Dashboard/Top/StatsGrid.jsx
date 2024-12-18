import PurpleLine from "@/assets/PurpleLine";
import DashboardCard from "../DashboardCard";
import NumberChange from "./NumberChange";
import TurquoiseLine from "@/assets/TurquoiseLine";
import YellowLine from "@/assets/YellowLine";
import BlueLine from "@/assets/BlueLine";
import { ChooseDayComboBox } from "./ChooseDay";

const StatsGrid = ({ information }) => {
  const formatNumber = (num) =>
    typeof num === "number" ? num.toFixed(1) : num;

  // const revenue = {
  //   label: "Doanh thu",
  //   value: formatNumber(information.revenue),
  //   change: `${formatNumber(information.revenuePercentage)}%`
  // };

  const statsData = [
    {
      label: "Số học viên mới",
      value: formatNumber(information.newStudents),
      change: `${formatNumber(information.newStudentsPercentage)}%`
    },
    {
      label: "Số giảng viên mới",
      value: formatNumber(information.newLecturer),
      change: `${formatNumber(information.newLecturerPercentage)}%`
    },
    {
      label: "Số khóa học mới",
      value: formatNumber(information.newCourses),
      change: `${formatNumber(information.newCoursesPercentage)}%`
    },
    {
      label: "Số khóa học được mua",
      value: formatNumber(information.coursesPurchased),
      change: `${formatNumber(information.coursesPurchasedPercentage)}%`
    },
    {
      label: "SỐ LƯỢT ĐÁNH GIÁ KHOÁ HỌC",
      value: formatNumber(information.courseRatings),
      change: `${formatNumber(information.courseRatingsPercentage)}%`
    },
    {
      label: "ĐÁNH GIÁ TRUNG BÌNH CỦA KHOÁ HỌC",
      value: `${formatNumber(information.averageRating)} sao`,
      change: `${formatNumber(information.averageRatingPercentage)}%`
    }
  ];

  return (
    <div className="bg-white border rounded-2xl shadow-sm border-gray-300 p-7">
      <div>
        <div className="flex w-full justify-between items-center gap-[10px]">
          <h2 className="text-text/xl/medium text-black-300 uppercase">
            CƠ HỘI
          </h2>
          <ChooseDayComboBox />
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
