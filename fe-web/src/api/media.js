import { showToast } from "@/store/rtk/toast";
import api from "./apiConfig";

export const mediaApi = {
  getVideoUrl: async () => {
    try {
      const response = await api.get(`/media/video-url`);
      return response.data;
    } catch (error) {
      console.log(error);
      showToast({
        type: "error",
        msg: "Lấy video url thất bại",
        desc: "Lỗi không xác định",
      });
    }
  },
  uploadVideo: async (fileName, payload) => {
    try {
      const response = await api.post(
        `/media/upload-video/${fileName}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      showToast({
        type: "error",
        msg: "Tải video thất bại",
        desc: "Lỗi không xác định",
      });
    }
  },
};
