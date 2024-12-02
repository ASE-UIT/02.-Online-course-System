import { Search } from "lucide-react";

const Searchbar = ({ placeholder, value, onChange }) => {
  return (
    <div className="w-full bg-primary-700 relative px-2 py-2 flex items-center gap-2 text-black border border-transparent rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
      <Search className="w-5 h-5 text-white" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="placeholder-white bg-primary-700 w-full text/md/regular focus:outline-none"
      />
    </div>
  );
};

export default Searchbar;
