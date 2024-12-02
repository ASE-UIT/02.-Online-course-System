import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const data = {
    labels: ["01/12", "02/12", "03/12", "04/12", "05/12"],
    datasets: [
      {
        label: "Doanh Thu",
        data: [10, 20, 15, 30, 25],
        fill: false,
        backgroundColor: "#4ADE80", // Tailwind "green-400"
        borderColor: "#4ADE80"
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Doanh Thu (Revenue Chart)
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
