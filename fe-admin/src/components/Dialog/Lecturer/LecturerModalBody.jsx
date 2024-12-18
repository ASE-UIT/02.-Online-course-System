import { createLecturer, updateLecturer } from "@/api/employeeApi";
import { mediaApi } from "@/api/mediaApi";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";

// Define the Zod schema
const lecturerSchema = z.object({
  name: z.string().min(1, "Tên không được để trống."),
  title: z.string().optional(),
  email: z.string().email("Email không hợp lệ."),
  phoneNumber: z.string().optional(),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  // avatar: z.custom((file) => file instanceof File && file.type.startsWith("image/"), {
  //   message: "Vui lòng tải lên một tệp hình ảnh hợp lệ.",
  // }),
  // address: z.string().min(1, "Địa chỉ không được để trống."),
});
const LecturerModalBody = ({ row, isAddOrChange }) => {
  const fileInputRef = useRef(null);
  const [fileSlt, setFileSlt] = useState(null);
  const [lecturerName, setLecturerName] = useState("");
  // const [lecturerTitle, setLecturerTitle] = useState("");
  const [lecturerEmail, setLecturerEmail] = useState("");
  const [lecturerPhone, setLecturerPhone] = useState("");
  const [lecturerAddress, setLecturerAddress] = useState("");
  const [lecturerPassword, setLecturerPassword] = useState("");
  const [lecturerAvatar, setLecturerAvatar] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // const [createLecturer] = useCreateCategoryMutation();
  // const [updateLecturer] = useUpdateLecturerMutation();

  useEffect(() => {
    if (!isAddOrChange && row) {
      setLecturerName(row.name || "");
      // setLecturerTitle(row.title || "");
      setLecturerEmail(row.email || "");
      setLecturerPhone(row.phoneNumber || "");
      setLecturerAvatar(row.avatar || null);
      setLecturerPassword(row.password || "");
      setLecturerAddress(row.address || "");
    }
  }, [isAddOrChange, row]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileSlt(file || null);
  };
  const uploadImage = async () => {
    const fileUrlResponse = await mediaApi.getImageUrl();
    if (!fileUrlResponse?.data) return;
    const formData = new FormData();
    formData.append("file", fileSlt);
    await mediaApi.uploadImage(fileUrlResponse.data.fileName, formData);
    return fileUrlResponse.data.mediaUrl; // The URL of the uploaded image
  };

  const handleFormSubmit = async () => {
    setFormErrors({});

    // if (!fileSlt && !lecturerAvatar) {
    //   setFormErrors((prevErrors) => ({
    //     ...prevErrors,
    //     avatar: "Ảnh đại diện là bắt buộc.",
    //   }));
    //   console.log("Avatar error: Missing file or existing avatar.");
    //   return;
    // }
    const payload = {
      name: lecturerName,
      // title: lecturerTitle,
      email: lecturerEmail,
      phoneNumber: lecturerPhone,
      password: lecturerPassword,
      avatar: fileSlt || lecturerAvatar,
      address: lecturerAddress,
    };
    console.log("Payload before validation:", payload);
    const baseValidation = lecturerSchema.safeParse(payload);

    if (!baseValidation.success) {
      const errors = {};
      baseValidation.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFormErrors(errors);
      console.log("Validation errors:", errors);
      return;
    }
    try {
      let imageUrl = lecturerAvatar;
      if (fileSlt) {
        imageUrl = await uploadImage();
      }

      const finalPayload = {
        ...payload,
        avatar: imageUrl,
      };
      console.log("Final Payload:", finalPayload);
      if (isAddOrChange) {
        await createLecturer(finalPayload);
        alert("Lecturer created successfully!");
      } else {
        await updateLecturer(row.id, finalPayload);
        alert("Lecturer updated successfully!");
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
      setFormErrors({ global: "Failed to submit lecturer. Please try again." });
    }
  };
  return (
    <div className="max-h-screen overflow-y-auto">
      <div className="flex flex-col gap-5 ">
        {/* Avatar */}
        <div
          className={`${
            formErrors.avatar ? "border-red-500 bg-red-50" : "border-gray-600"
          } py-4 border-2 border-dashed  flex flex-col gap-2 items-center justify-center`}
        >
          <label className="block text-md font-medium mt-4">Ảnh đại diện</label>
          {fileSlt ? (
            <p className="text-sm text-green-600">{fileSlt.name}</p>
          ) : lecturerAvatar ? (
            <img src={lecturerAvatar} alt="Current Avatar" className="w-24 h-24 object-cover rounded-md" />
          ) : (
            <p className="text-sm text-red-500">Chưa có ảnh đại diện.</p>
          )}
          <div
            onClick={() => handleUploadClick()}
            className="cursor-pointer hover:bg-primary-600 text-black transition-all px-[16px] py-[12px] flex items-center gap-2 bg-gray-500 rounded-[8px] hover:text-white mt-2"
          >
            <UploadCloud />
            <p>Tải lên ảnh</p>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {formErrors.avatar && <p className="text-sm text-red-500 mt-1">{formErrors.avatar}</p>}
        </div>
        {/* Name */}
        <div className="name">
          <label className="block text-md font-medium mb-2">
            Tên<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full border ${formErrors.name ? "border-red-500" : "border-gray-600"} rounded-md px-3 py-2`}
            placeholder="Enter name"
            value={lecturerName}
            onChange={(e) => setLecturerName(e.target.value)}
          />
          {formErrors.name && <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>}
        </div>

        {/* Title */}
        {/* <div className="title">
          <label className="block text-md font-medium mb-2">Chức danh</label>
          <input
            type="text"
            className="w-full border border-gray-600 rounded-md px-3 py-2"
            placeholder="Enter title"
            value={lecturerTitle}
            onChange={(e) => setLecturerTitle(e.target.value)}
          />
        </div> */}

        {/* Email */}
        <div className="email">
          <label className="block text-md font-medium mb-2">
            Email<span className="text-red-500">*</span>
          </label>
          {isAddOrChange ? (
            <input
              type="email"
              className={`w-full border ${
                formErrors.email ? "border-red-500" : "border-gray-600"
              } rounded-md px-3 py-2`}
              placeholder="Enter email"
              value={lecturerEmail}
              onChange={(e) => setLecturerEmail(e.target.value)}
            />
          ) : (
            <p className="text-lg font-semibold">{lecturerEmail}</p>
          )}
          {formErrors.email && <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>}
        </div>

        {/* Phone */}
        <div className="phone">
          <label className="block text-md font-medium mb-2">Điện thoại</label>
          {isAddOrChange ? (
            <input
              type="text"
              className="w-full border border-gray-600 rounded-md px-3 py-2"
              placeholder="Enter phone number"
              value={lecturerPhone}
              onChange={(e) => setLecturerPhone(e.target.value)}
            />
          ) : (
            <p className="text-lg font-semibold">{lecturerPhone}</p>
          )}
        </div>
        {/* Address */}
        <div className="address">
          <label className="block text-md font-medium mb-2">Địa chỉ</label>
          {isAddOrChange ? (
            <input
              type="text"
              className={`w-full border ${
                formErrors.address ? "border-red-500" : "border-gray-600"
              } rounded-md px-3 py-2`}
              placeholder="Enter address"
              value={lecturerAddress}
              onChange={(e) => setLecturerAddress(e.target.value)}
            />
          ) : (
            <p className="text-lg font-semibold">{lecturerAddress}</p>
          )}
          {formErrors.address && <p className="text-sm text-red-500 mt-1">{formErrors.address}</p>}
        </div>
        {/* Password */}
        <div className="password">
          <label className="block text-md font-medium mb-2">
            Mật khẩu<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className={`w-full border ${
              formErrors.password ? "border-red-500" : "border-gray-600"
            } rounded-md px-3 py-2`}
            placeholder="Enter password"
            value={lecturerPassword}
            onChange={(e) => setLecturerPassword(e.target.value)}
          />
          {formErrors.password && <p className="text-sm text-red-500 mt-1">{formErrors.password}</p>}
        </div>

        {/* Buttons */}
        <div className="buttons flex justify-end gap-[10px]">
          <Button className="w-1/4" onClick={handleFormSubmit}>
            {isAddOrChange ? "Thêm" : "Sửa"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LecturerModalBody;
