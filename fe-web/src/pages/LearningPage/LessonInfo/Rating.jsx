import ProgressBar from "@/components/Rating/ProgressBar";
import Rating from "@/components/Rating/Rating";
import Select from "@/components/Select/Select";
import { ChevronDown } from "lucide-react";

export default function RatingSection() {
  return (
    <div className="mt-[20px]">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <p className="text-warning-500 text-display/2xl/bold">4.8</p>
          <Rating rating={5} parentClass={"gap-2"} />
          <p className="mt-2">Điểm đánh giá trung bình</p>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <ProgressBar progress={80} />
          <ProgressBar progress={20} />
          <ProgressBar progress={0} />
          <ProgressBar progress={0} />
          <ProgressBar progress={0} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Rating rating={4} parentClass="gap-2" />
            <p>75%</p>
          </div>
          <div className="flex items-center gap-2">
            <Rating rating={4} parentClass="gap-2" />
            <p>75%</p>
          </div>
          <div className="flex items-center gap-2">
            <Rating rating={4} parentClass="gap-2" />
            <p>75%</p>
          </div>
          <div className="flex items-center gap-2">
            <Rating rating={4} parentClass="gap-2" />
            <p>75%</p>
          </div>
          <div className="flex items-center gap-2">
            <Rating rating={4} parentClass="gap-2" />
            <p>75%</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-[20px]">
        <p className="text-text/lg/semibold">Đánh giá</p>
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
          </div>
          <div>
            <p className="text-text/md/medium mb-2">Sắp xếp theo</p>
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
          </div>
        </div>
      </div>
      <div className="my-8"></div>
      <div className="bg-gray-300 rounded-[12px] p-[10px]">
        <div className="flex gap-[12px] items-start">
          <div
            className="min-w-[32px] h-[32px] bg-center bg-cover rounded-full overflow-hidden"
            style={{
              backgroundImage: `url(https://s3-alpha-sig.figma.com/img/bd66/44b6/b2a44218a37e0f4a110e8345dba0a38a?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cKkUOfyL9yVSVDUe76SpuRZc6JBJBEv7py7W9K8RIHJr7-HT~0lJYKfa4Kcmb3-emVSkBXyOIgrCF~eC8K6-KrBiUyu-~A99PvySQBqbR1-D6YA2-pAF20cJx2zsGW5vpwfD~RQPGyxObhRGnWtHSAX6V2pi6icUAJpQpY4UMY5XMVeUBuJtOwLq5df0Nh6mReqywsym3pOckZjp21GsE2bzISASpAbM-qZd2eA-Makr7STF5BRwXde~pxQm1A74c7Wy13OgXiBd1nwRHNrM9kS6oX0qkrGiZ-KxTSm6yi3CA8dn6bRcwmEFTZ4UF1vzGZyHSvWizBEgUUG5RzMEtg__)`,
            }}
          ></div>
          <div className="flex flex-col">
            <p className="text-text/md/semibold">Nguyễn Văn B</p>
            <div className="flex items-center gap-2">
              <Rating rating={4} />
              <p className="text-text/md/regular">1 ngày trước</p>
            </div>
          </div>
        </div>
        <p className="text-text/md/regular mt-2">Khoá học rất bổ ích. Cảm ơn!</p>
      </div>
    </div>
  );
}
