import { useState } from "react";
import ProfileTab from "./ProfileTab";
import PasswordTab from "./PasswordTab";
import AdvancedTab from "./AdvancedTab";

const ProfileSettings = ({ pageName }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab pageName={pageName} />;
      case "password":
        return <PasswordTab />;
      case "advanced":
        return <AdvancedTab />;
      default:
        return <ProfileTab pageName={pageName} />;
    }
  };

  return (
    <div className="w-full h-full bg-gray-100 p-8 m-1">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full h-max lg:w-1/4 bg-white border-gray-200 rounded-lg shadow-lg ">
          <ul className="p-4 space-y-4">
            <li
              onClick={() => setActiveTab("profile")}
              className={`cursor-pointer text-text/lg/regular ${
                activeTab === "profile"
                  ? "text-black text-text/lg/semibold"
                  : "text-gray-700"
              }`}
            >
              Thông tin hồ sơ
            </li>
            <li
              onClick={() => setActiveTab("password")}
              className={`cursor-pointer text-text/lg/regular ${
                activeTab === "password"
                  ? "text-black text-text/lg/semibold"
                  : "text-gray-700"
              }`}
            >
              Đổi mật khẩu
            </li>
            <li
              onClick={() => setActiveTab("advanced")}
              className={`cursor-pointer text-text/lg/regular ${
                activeTab === "advanced"
                  ? "text-black regular"
                  : "text-gray-700"
              }`}
            >
              Nâng cao
            </li>
          </ul>
        </div>

        <div className="hidden lg:block w-8"></div>

        {/* Dynamic Content */}
        <div className="w-full h-full lg:w-3/4 p-6 bg-white border-gray-200 rounded-lg shadow-lg ">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
