const RevenueGrid = () => {
  return (
    <div className="p-2 bg-white rounded-2xl shadow-sm">
      <div className="p-5 space-y-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 uppercase">
          Doanh Thu
        </h2>
        <div className="flex justify-between items-center">
          <div className="w-1/2 border-r-2 border-gray-500">
            <h2 className="text-display/lg/medium">đ20M</h2>
            <p className="text-text/sm/medium">
              Đạt được <span className="text-green-600">+đ4,000,000</span> tuần
              này
            </p>
          </div>
          <div className="w-1/2 pl-6">
            <h2 className="text-display/lg/medium">đ190M</h2>
            <p className="text-text/sm/medium">
              Đạt được <span className="text-green-600">+đ10,000,000</span> tuần
              này
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueGrid;
