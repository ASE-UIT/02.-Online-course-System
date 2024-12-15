import { useSelector } from "react-redux";

const AvatarSection = ({ isStudentLayout }) => {
  const { studentInfor } = useSelector((state) => state);

  return (
    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
      {studentInfor?.studentInfor?.avatar && isStudentLayout ? (
        <img
          src={studentInfor?.studentInfor?.avatar}
          alt="avatar"
          className="rounded-full"
        />
      ) : (
        <div className="flex justify-center items-center">
          <span className="text-white font-semibold w-[40px] h-10 text-center"></span>
        </div>
      )}
    </div>
  );
};

export default AvatarSection;
