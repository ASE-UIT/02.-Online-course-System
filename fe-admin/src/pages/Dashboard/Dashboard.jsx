import DashboardGrid from "@/components/Dashboard/Below/BelowGrid";
import RevenueChart from "@/components/Dashboard/Top/RevenueChart";
import RevenueGrid from "@/components/Dashboard/Top/RevenueGrid";
import StatsGrid from "@/components/Dashboard/Top/StatsGrid";

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
        <div className="space-y-2">
          <RevenueGrid />
          <RevenueChart />
        </div>
        <div className="lg:col-span-2">
          <DashboardGrid />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
