import React from "react";

const AdvancedTab = () => {
  return (
    <div>
      <h2 className="text-text/xl/semibold mb-4">Cài đặt nâng cao</h2>
      <p className="text-black mb-4">
        Bằng cách nhấn xoá tài khoản, tài khoản của bị sẽ tạm thời bị{" "}
        <span className="font-bold text-black">vô hiệu hóa trong 30 ngày</span>.
        Nếu sau khoảng thời gian này bạn đăng nhập lại tài khoản, tài khoản sẽ
        được kích hoạt lại và lệnh xoá tài khoản của bạn sẽ bị bãi bỏ. Nếu không
        có bất kỳ hành động nào khác thì sau khoảng thời gian này, tài khoản sẽ
        bị xoá vĩnh viễn khỏi hệ thống, mọi thông tin, khoá học của bạn cũng sẽ
        bị xoá khỏi hệ thống và bạn sẽ không bao giờ có thể truy cập vào những
        tài nguyên này được nữa. Bạn chắc chắn muốn xoá tài khoản chứ?
      </p>
      <p className="text-text/md/semibold ">
        Bạn chắc chắn muốn xoá tài khoản chứ?
      </p>
      <button
        className="bg-error-600 text-white px-4 py-2 mt-4 rounded hover:bg-error-700 rouded-lg"
        type="button"
      >
        Tôi đồng ý
      </button>
    </div>
  );
};

export default AdvancedTab;
