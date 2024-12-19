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
import { useRef, useEffect, useState } from "react";

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

const RevenueChart = ({
  timePeriod,
  dailyRevenue,
  weekRevenue,
  monthRevenue
}) => {
  const chartRef = useRef(null);
  const [labels, setLabels] = useState([]);
  console.log("🚀 ~ RevenueChart ~ labels:", labels);
  const [dataPoints, setDataPoints] = useState([]);
  console.log("🚀 ~ RevenueChart ~ dataPoints:", dataPoints);
  const [revenueData, setRevenueData] = useState(null);

  // Determine which revenue data to use
  useEffect(() => {
    switch (timePeriod) {
      case "month":
        setRevenueData(weekRevenue);
        break;
      case "year":
        setRevenueData(monthRevenue);
        break;
      case "week":
      default:
        setRevenueData(dailyRevenue);
        break;
    }
  }, [timePeriod, monthRevenue, weekRevenue, dailyRevenue]);

  useEffect(() => {
    // Map revenueData to labels and data
    switch (timePeriod) {
      case "month":
        setLabels(revenueData?.revenue?.map((item) => item.week));
        break;
      case "year":
        setLabels(revenueData?.revenue?.map((item) => item.month));
        break;
      case "week":
      default:
        setLabels(revenueData?.revenue?.map((item) => item.date));
        break;
    }
    setDataPoints(revenueData?.revenue?.map((item) => item.revenue));
  }, [revenueData, timePeriod]);

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
