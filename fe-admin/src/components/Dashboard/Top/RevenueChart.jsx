import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Import Filler for area chart
} from "chart.js";
import { useRef } from "react";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register Filler for area chart
);

const RevenueChart = ({ dailyRevenue }) => {
  const chartRef = useRef(null);

  // Map dailyRevenue to labels and data
  const labels = dailyRevenue.revenue.map((item) => item.date);
  const dataPoints = dailyRevenue.revenue.map((item) => item.revenue);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Doanh Thu",
        data: dataPoints,
        fill: true, // Enable fill for area chart
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart render
            return null;
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "#E6E5FB");
          gradient.addColorStop(1, "#FEFDFF");

          return gradient;
        },
        borderColor: "#978FED"
      }
    ]
  };

  const options = {
    layout: {
      padding: {
        top: 50 // Add more space above the chart
      }
    }
  };

  return (
    <div className="overflow-hidden w-full h-full max-w-[800px] max-h-[450px] bg-gradient-to-r from-[#EBEAFC85] to-white border-transparent rounded-2xl flex justify-center items-center">
      <Line ref={chartRef} data={data} options={options} height={180} />
    </div>
  );
};

export default RevenueChart;
