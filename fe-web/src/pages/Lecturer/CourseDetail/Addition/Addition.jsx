import { Input } from "@/components/ui/input";
import UploadBar from "../../components/UploadBar";
import { Button } from "@/components/ui/button";

export default function Addition() {
  return (
    <div className="p-[20px]">
      <header className="text-display/md/medium">TÀI LIỆU VÀ QUÀ TẶNG</header>
      <div className="flex flex-col gap-2 mt-6">
        <UploadBar />
        <UploadBar />
      </div>
      <div className="mt-4">
        <p className="text-text/md/medium">Quà tặng Khoá học</p>
        <Input className={"mt-2"} placeholder="Chọn khóa học" />
      </div>

      <Button type="submit" className=" inline-block mt-5 px-8 rounded-xl">
        Lưu
      </Button>
    </div>
  );
}
