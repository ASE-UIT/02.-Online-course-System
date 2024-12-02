import RevenueChart from "@/components/Dashboard/RevenueChart";
import StatsGrid from "@/components/Dashboard/StatsGrid";

const Dashboard = () => {
  return (
    <section className="min-h-screen bg-gray-300">
      <div className="text-start">
        <h1 className="text-display/sm/semibold text-black">
          Xin chào, chào mừng bạn quay trở lại!
        </h1>
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <StatsGrid />
        <RevenueChart />
      </div>
    </section>
  );
};

export default Dashboard;
