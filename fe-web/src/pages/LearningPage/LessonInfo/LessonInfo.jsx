import { useState } from "react";
import { useSelector } from "react-redux";
import General from "./General";
const tabOpts = [
  {
    label: "Tổng quan",
    value: "general",
  },
  {
    label: "Thảo luận",
    value: "discuss",
  },
  {
    label: "Tài liệu",
    value: "docs",
  },
  {
    label: "Đánh giá",
    value: "rating",
  },
];
export default function LessonInfo() {
  const [tabSlt, setTabSlt] = useState(0);
  const { lesson } = useSelector((state) => state.learning);
  if (!lesson) return <></>;
  return (
    <div className="bg-gray-100 px-[20px] pt-[15px] h-[1000px]">
      <p className="text-text/xl/semibold">{lesson.title}</p>
      <div className="flex items-center mt-2 gap-[10px]">
        {tabOpts.map((tab, idx) => (
          <div
            key={idx}
            onClick={() => setTabSlt(idx)}
            className={`${
              idx === tabSlt
                ? "border-black text-black"
                : "border-black-300 text-black-300"
            } border-b-[2px]  text-text/lg/semibold cursor-pointer px-[8px] py-[10px] `}
          >
            <p>{tab.label}</p>
          </div>
        ))}
      </div>
      <div className="h-[2px] mt-[-2px] bg-black-300"></div>
      {tabOpts[tabSlt].value === "general" && <General />}
    </div>
  );
}
