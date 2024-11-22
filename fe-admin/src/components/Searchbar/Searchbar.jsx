import { Search } from "lucide-react";

const Searchbar = ({ placeholder, value, onChange }) => {
  return (
    <div className="w-full relative px-2 py-2 flex items-center gap-2 text-black border border-gray-500 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
      <Search className="text-black-300 w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="placeholder-black w-full text-black text/md/regular focus:outline-none"
      />
    </div>
  );
};

export default Searchbar;
