export default function DeleteModal({ onClose, title, msg, handleDelete }) {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-[9999] flex items-center justify-center"
    >
      <div className="bg-white p-[20px] rounded-lg w-[500px]">
        <header className="text-[24px] font-semibold">{title}</header>
        <p>{msg}</p>
        <div className="flex items-center gap-4 mt-4">
          <div
            onClick={() => onClose()}
            className="px-6 py-2 rounded-md  cursor-pointer hover:bg-gray-400 transition-all"
          >
            Hủy bỏ
          </div>
          <div
            onClick={() => {
              handleDelete();
              onClose();
            }}
            className="px-6 py-2 rounded-md bg-primary-500 text-white cursor-pointer hover:bg-primary-600 transition-all"
          >
            Tiếp tục
          </div>
        </div>
      </div>
    </div>
  );
}
