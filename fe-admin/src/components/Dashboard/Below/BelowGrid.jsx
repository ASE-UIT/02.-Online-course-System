import DashboardCard from "../DashboardCard";

const sampleData = [
  { label: "SỐ LƯỢT TRUY CẬP", value: "100K", change: "+3.4%" },
  { label: "TGTB Ở TRANG WEB", value: "1h30p", change: "+3.4%" },
  { label: "SỐ LƯỢT TƯƠNG TÁC VỚI KHOÁ HỌC", value: "203K", change: "-3.4%" },
  { label: "SỐ LƯỢT ĐÁNH GIÁ KHOÁ HỌC", value: "500K", change: "+3.4%" },
  { label: "TGTB HỌC KHOÁ HỌC", value: "10h20p", change: "+3.4%" },
  {
    label: "SỐ LƯỢNG TÀI LIỆU TRUNG BÌNH TRONG KHOÁ HỌC",
    value: "8",
    change: "+3.4%"
  },
  {
    label: "ĐÁNH GIÁ TRUNG BÌNH CỦA KHOÁ HỌC",
    value: "3 sao",
    change: "-3.4%"
  },
  { label: "SỐ LƯỢNG XEM TRUNG BÌNH", value: "100K", change: "+3.4%" }
];

const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {sampleData.map((data, index) => (
        <DashboardCard key={index} {...data} />
      ))}
    </div>
  );
};

export default DashboardGrid;
