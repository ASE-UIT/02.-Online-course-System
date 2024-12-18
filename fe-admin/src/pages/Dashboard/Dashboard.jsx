import { getWeekStat } from "@/api/statisticApi";
import RevenueChart from "@/components/Dashboard/Top/RevenueChart";
import RevenueGrid from "@/components/Dashboard/Top/RevenueGrid";
import StatsGrid from "@/components/Dashboard/Top/StatsGrid";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [information, setInformation] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getWeekStat();
        setDailyRevenue(res.data?.dailyRevenue);
        setInformation(res.data?.information);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="min-h-screen bg-gray-300">
      <div className="text-start">
        <h1 className="text-display/sm/semibold text-black">
          Xin chào, chào mừng bạn quay trở lại!
        </h1>
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <StatsGrid information={information} />
        <div className="space-y-2">
          <RevenueGrid information={information} />
          <RevenueChart dailyRevenue={dailyRevenue} />
        </div>
        {/* <div className="lg:col-span-2">
          <DashboardGrid />
        </div> */}
      </div>
    </section>
  );
};

export default Dashboard;
