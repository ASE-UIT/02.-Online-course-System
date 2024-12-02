import { Dot } from "lucide-react";
import NumberChange from "./Top/NumberChange";

const DashboardCard = ({ value, label, change }) => {
  return (
    <div className="flex flex-1 h-[114px] p-3 flex-col justify-between items-start bg-white border rounded-lg border-gray-300 shadow-sm">
      <div className="flex">
        <Dot size={20} className="text-purple-400" />
        <p className="text-text/sm/medium text-gray-800 uppercase">{label}</p>
      </div>
      <div className="flex justify-between items-center self-stretch">
        <h2 className="text-display/sm/medium ">{value}</h2>
        <NumberChange change={change} />
      </div>
    </div>
  );
};

export default DashboardCard;
