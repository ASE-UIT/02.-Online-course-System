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

const RevenueChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: [
      "01/12",
      "02/12",
      "03/12",
      "04/12",
      "05/12",
      "06/12",
      "07/12",
      "08/12",
      "09/12",
      "10/12",
      "11/12",
      "12/12",
      "13/12",
      "14/12",
      "15/12"
    ],
    datasets: [
      {
        label: "Doanh Thu",
        data: [10, 25, 5, 30, 20, 45, 35, 50, 40, 55, 30, 40, 20, 45, 42],
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
    scales: {
      x: {
        display: false, // Hide x-axis
        grid: {
          display: false // Hide x-axis grid lines
        },
        ticks: {
          display: false // Hide x-axis tick labels
        }
      },
      y: {
        display: false, // Hide y-axis
        beginAtZero: true,
        grid: {
          display: false // Hide y-axis grid lines
        },
        ticks: {
          display: false // Hide y-axis tick labels
        }
      }
    },
    plugins: {
      legend: {
        display: false // Disable legend
      },
      tooltip: {
        enabled: false // Disable tooltip
      }
    },
    layout: {
      padding: {
        top: 50 // Add more space above the chart
      }
    }
  };

  return (
    <div className="overflow-hidden w-full h-full max-w-[800px] max-h-[320px] bg-gradient-to-r from-[#EBEAFC85] to-white border-transparent rounded-2xl flex justify-center items-center">
      <Line ref={chartRef} data={data} options={options} height={180} />
    </div>
  );
};

export default RevenueChart;
