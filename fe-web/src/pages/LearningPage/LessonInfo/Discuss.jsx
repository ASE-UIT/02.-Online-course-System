import Select from "@/components/Select/Select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, MessageSquareText, Plus, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function Discuss() {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="mt-[20px]">
      <div
        onClick={() => setShowInput(true)}
        className="gap-2 cursor-pointer hover:bg-gray-300 transition-all items-center px-[16px] py-3 border-[1px] border-gray-500 rounded-[8px] inline-flex"
      >
        <Plus />
        <p className="text-text/md/medium">Đặt câu hỏi mới</p>
      </div>
      {showInput && (
        <>
          <Textarea className={"mt-4 h-[120px] border-gray-600"} />
          <div className="flex justify-end mt-[12px] gap-4">
            <div className="hover:bg-primary-600 transition-all cursor-pointer p-[8px] min-w-[100px] text-text/md/medium text-white bg-primary-500 text-center rounded-[8px]">
              Gửi
            </div>
            <div
              onClick={() => setShowInput(false)}
              className="hover:bg-gray-600 transition-all cursor-pointer p-[8px] min-w-[100px] text-text/md/medium bg-gray-500 text-center rounded-[8px]"
            >
              Hủy
            </div>
          </div>
        </>
      )}
      <div className="flex justify-between items-center mt-[20px]">
        <p className="text-text/lg/semibold">Tất cả thảo luận trong khoá học này (n)</p>
        <div className="flex gap-4">
          <div>
            <p className="text-text/md/medium mb-2">Bộ lọc</p>
            <Select
              options={[{ label: "Lucy", value: "Lucy" }]}
              parent={
                <div
                  className="w-[220px] flex justify-between px-[16px] py-[12px] bg-white rounded-[8px] gap-2 cursor-pointer hover:bg-gray-300 transition-all"
                  style={{
                    boxShadow: `0px 8px 15.9px 0px rgba(0, 0, 0, 0.07)`,
                  }}
                >
                  <p className="text-text/md/medium">Gần đây nhất</p>
                  <ChevronDown />
                </div>
              }
            />
            {/* <Popover>
              <PopoverTrigger asChild>
                <div
                  className="w-[220px] justify-between flex px-[16px] py-[12px] bg-white rounded-[8px] gap-2 cursor-pointer hover:bg-gray-300 transition-all"
                  style={{
                    boxShadow: `0px 8px 15.9px 0px rgba(0, 0, 0, 0.07)`,
                  }}
                >
                  <p className="text-text/md/medium">Tất cả các bài giảng</p>
                  <ChevronDown />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[220px]">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover> */}
          </div>
          <div>
            <p className="text-text/md/medium mb-2">Sắp xếp theo</p>
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className="w-[220px] flex justify-between px-[16px] py-[12px] bg-white rounded-[8px] gap-2 cursor-pointer hover:bg-gray-300 transition-all"
                  style={{
                    boxShadow: `0px 8px 15.9px 0px rgba(0, 0, 0, 0.07)`,
                  }}
                >
                  <p className="text-text/md/medium">Gần đây nhất</p>
                  <ChevronDown />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[220px]">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="flex gap-[10px] items-start mt-[20px]">
        <div
          className="rounded-full min-w-[32px] h-[32px] bg-center bg-cover"
          style={{
            backgroundImage: `url(https://s3-alpha-sig.figma.com/img/5641/7762/309a183aa654f1aef9769c111e38197a?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RTRxYdSOAVpFt4DWrw2SW5ixIpLDfBFK2X9aYNHoIrZ2bOglZ84s-pXqWoXfAc-KYeny9BgOPm9nUJL1hxQFDh0fjIECCAQgy83Ig-60LFvpNaU6qGY0ePQ5bxUeLwjfKHof6QgVcBgoBe9OguhpvVVKlvGWYLdJ-6KeUg9XlDvlZekh30STptNhwxR2tE9EBYtsspcdXR8Ut09RYM-e-ymoSk4HCeegLdjVYuY-~TtulMl-XBnhfJedW39X-OEx2vyjKmtH30t-FjqVx67Hp9JY~ErT2cxq80kr7hwW~UlCqIegxw5y8lK0DRtXmAkNrPKgokpPcVFE-9zLmKfy4w__)`,
          }}
        ></div>
        <div className=" flex-1">
          <p className="text-text/md/semibold">Nguyễn Văn B</p>
          <p className="text-text/xs/regular text-black-300 ">1 ngày trước</p>
          <p className="text-text/md/regular mt-1">Chào</p>
          <div className="flex justify-between w-full mt-2">
            <div className="flex gap-2">
              <div className="text-text/xs/medium text-primary-500 cursor-pointer hover:text-primary-600 transition-all">
                Thích
              </div>
              <div className="text-text/xs/medium text-primary-500 cursor-pointer hover:text-primary-600 transition-all">
                Trả lời
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-[16px] h-[16px] cursor-pointer" />
                <p>0</p>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquareText className="w-[16px] h-[16px] cursor-pointer" />
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
