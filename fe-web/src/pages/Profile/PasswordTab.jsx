import React from "react";

const PasswordTab = () => {
  return (
    <div>
      <h2 className="text-text/xl/semibold mb-4">Đổi mật khẩu</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-600">Mật khẩu cũ</label>
          <input type="password" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-gray-600">Mật khẩu mới</label>
          <input type="password" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-gray-600">Xác nhận mật khẩu mới</label>
          <input type="password" className="w-full p-2 border rounded-md" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thay đổi
        </button>
      </form>
    </div>
  );
};

export default PasswordTab;
