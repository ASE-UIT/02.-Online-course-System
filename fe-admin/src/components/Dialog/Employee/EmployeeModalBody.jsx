import { createEmployee, updateEmployee } from "@/api/employeeApi";
import { mediaApi } from "@/api/mediaApi";
import { Button } from "@/components/ui/button";
import { useFetchRolesQuery } from "@/store/rtk/employee.service";
import { UploadCloud } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";

// Define the Zod schema for Employee
const employeeSchema = z.object({
  name: z.string().min(1, "Tên không được để trống."),
  email: z.string().email("Email không hợp lệ."),
  phoneNumber: z.string().optional(),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự.").optional(),
  // avatar: z.custom((file) => file instanceof File && file.type.startsWith("image/"), {
  //   message: "Vui lòng tải lên một tệp hình ảnh hợp lệ.",
  // }),
  roleId: z.string().min(1, "Vai trò là bắt buộc."),
});

const EmployeeModalBody = ({ row, isAddOrChange }) => {
  const fileInputRef = useRef(null);
  const [fileSlt, setFileSlt] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    avatar: null,
    roleId: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const { data: roles = [], isLoading: rolesLoading } = useFetchRolesQuery();

  useEffect(() => {
    if (!isAddOrChange && row) {
      setFormData({
        name: row.name || "",
        email: row.email || "",
        phoneNumber: row.phone || "",
        avatar: row.avatar || null,
        password: "",
        roleId: row.roleId || "",
      });
    }
  }, [isAddOrChange, row]);

  const handleUploadClick = () => fileInputRef.current?.click();

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
    return fileUrlResponse.data.mediaUrl;
  };

  const handleFormSubmit = async () => {
    // console.log("Form submit clicked");
    setFormErrors({});
    // if (!fileSlt && !formData.avatar) {
    //   setFormErrors((prevErrors) => ({
    //     ...prevErrors,
    //     avatar: "Ảnh đại diện là bắt buộc.",
    //   }));
    //   return;
    // }

    const payload = {
      ...formData,
      avatar: fileSlt || formData.avatar,
    };

    const validation = employeeSchema.safeParse(payload);
    if (!validation.success) {
      const errors = {};
      validation.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFormErrors(errors);
      // console.log("Validation Errors:", errors);
      return;
    }

    try {
      let imageUrl = formData.avatar;
      if (fileSlt) {
        imageUrl = await uploadImage();
      }

      const finalPayload = { ...payload, avatar: imageUrl };

      if (isAddOrChange) {
        await createEmployee(finalPayload);
        alert("Nhân viên đã được thêm thành công!");
      } else {
        await updateEmployee(row.id, finalPayload);
        alert("Nhân viên đã được cập nhật thành công!");
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
      setFormErrors({ global: "Có lỗi xảy ra. Vui lòng thử lại." });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="mt-4 flex flex-col gap-5">
        {/* Avatar */}
        <div
          className={`py-4 border-2 border-dashed mt-3 flex flex-col gap-2 items-center justify-center ${
            formErrors.avatar ? "border-red-500 bg-red-50" : "border-gray-600"
          }`}
        >
          <label className="block text-md font-medium mt-4">Ảnh đại diện</label>
          {fileSlt ? (
            <p className="text-sm text-green-600">{fileSlt.name}</p>
          ) : formData.avatar ? (
            <img src={formData.avatar} alt="Current Avatar" className="w-24 h-24 object-cover rounded-md" />
          ) : (
            <p className="text-sm text-red-500">Chưa có ảnh đại diện.</p>
          )}
          <div
            onClick={handleUploadClick}
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
            Tên Nhân Viên<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full border ${formErrors.name ? "border-red-500" : "border-gray-600"} rounded-md px-3 py-2`}
            placeholder="Nhập tên nhân viên"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          {formErrors.name && <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>}
        </div>

        {/* Email */}
        <div className="email">
          <label className="block text-md font-medium mb-2">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className={`w-full border ${formErrors.email ? "border-red-500" : "border-gray-600"} rounded-md px-3 py-2`}
            placeholder="Nhập email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          {formErrors.email && <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>}
        </div>

        {/* Phone */}
        <div className="phone">
          <label className="block text-md font-medium mb-2">
            Số điện thoại<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full border ${
              formErrors.phoneNumber ? "border-red-500" : "border-gray-600"
            } rounded-md px-3 py-2`}
            placeholder="Nhập số điện thoại"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />
          {formErrors.phoneNumber && <p className="text-sm text-red-500 mt-1">{formErrors.phoneNumber}</p>}
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
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          {formErrors.password && <p className="text-sm text-red-500 mt-1">{formErrors.password}</p>}
        </div>
        {/* Role */}
        <div className="role">
          <label className="block text-md font-medium mb-2">
            Vai trò<span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full border ${formErrors.roleId ? "border-red-500" : "border-gray-600"} rounded-md px-3 py-2`}
            value={formData.roleId}
            onChange={(e) => handleInputChange("roleId", e.target.value)}
          >
            <option value="">Chọn vai trò</option>
            {!rolesLoading &&
              Array.isArray(roles?.data) && // Access roles through the `data` property
              roles.data.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.id} {/* Display the role's id or name */}
                </option>
              ))}
          </select>
          {formErrors.roleId && <p className="text-sm text-red-500 mt-1">{formErrors.roleId}</p>}
        </div>

        {/* Buttons */}
        <div className="buttons flex justify-end gap-[10px]">
          <Button className="w-1/4" onClick={handleFormSubmit}>
            {isAddOrChange ? "Thêm Nhân Viên" : "Cập nhật Nhân Viên"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModalBody;
