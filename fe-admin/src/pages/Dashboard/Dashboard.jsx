import { getWeekStat, getMonthStat, getYearStat } from "@/api/statisticApi";
import RevenueChart from "@/components/Dashboard/Top/RevenueChart";
import RevenueGrid from "@/components/Dashboard/Top/RevenueGrid";
import StatsGrid from "@/components/Dashboard/Top/StatsGrid";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [weekRevenue, setWeekRevenue] = useState([]);
  const [monthRevenue, setMonthRevenue] = useState([]);
  const [information, setInformation] = useState([]);
  const [timePeriod, setTimePeriod] = useState("week"); // Default to week

  useEffect(() => {
    async function fetchData(period) {
      try {
        let res;
        switch (period) {
          case "month":
            res = await getMonthStat();
            break;
          case "year":
            res = await getYearStat();
            break;
          case "week":
          default:
            res = await getWeekStat();
            break;
        }

        console.log("🚀 ~ fetchData ~ res:", res);

        setDailyRevenue(res?.data?.dailyRevenue || []);
        setWeekRevenue(res?.data?.weekRevenue || []);
        setMonthRevenue(res?.data?.monthRevenue || []);
        setInformation(res?.data?.information || []);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData(timePeriod);
  }, [timePeriod]);

  useEffect(() => {
    console.log("dailyRevenue:", dailyRevenue);
    console.log("weekRevenue:", weekRevenue);
    console.log("monthRevenue:", monthRevenue);
    console.log("information:", information);
  }, [dailyRevenue, information, monthRevenue, weekRevenue]);

  return (
    <section className="min-h-screen bg-gray-300">
      <div className="text-start">
        <h1 className="text-display/sm/semibold text-black">
          Xin chào, chào mừng bạn quay trở lại!
        </h1>
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <StatsGrid
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
          information={information}
        />
        <div className="space-y-2">
          <RevenueGrid information={information} />
          <RevenueChart
            timePeriod={timePeriod}
            dailyRevenue={dailyRevenue}
            weekRevenue={weekRevenue}
            monthRevenue={monthRevenue}
          />
        </div>
        {/* <div className="lg:col-span-2">
          <DashboardGrid />
        </div> */}
      </div>
    </section>
  );
};

export default Dashboard;
