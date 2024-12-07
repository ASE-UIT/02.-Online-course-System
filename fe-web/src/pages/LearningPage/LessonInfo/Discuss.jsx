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
          className="min-w-[32px] h-[32px] bg-center bg-cover"
          style={{
            backgroundImage: `url(https://s3-alpha-sig.figma.com/img/bd66/44b6/b2a44218a37e0f4a110e8345dba0a38a?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cKkUOfyL9yVSVDUe76SpuRZc6JBJBEv7py7W9K8RIHJr7-HT~0lJYKfa4Kcmb3-emVSkBXyOIgrCF~eC8K6-KrBiUyu-~A99PvySQBqbR1-D6YA2-pAF20cJx2zsGW5vpwfD~RQPGyxObhRGnWtHSAX6V2pi6icUAJpQpY4UMY5XMVeUBuJtOwLq5df0Nh6mReqywsym3pOckZjp21GsE2bzISASpAbM-qZd2eA-Makr7STF5BRwXde~pxQm1A74c7Wy13OgXiBd1nwRHNrM9kS6oX0qkrGiZ-KxTSm6yi3CA8dn6bRcwmEFTZ4UF1vzGZyHSvWizBEgUUG5RzMEtg__)`,
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
