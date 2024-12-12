import { Button } from "@/components/ui/button";
import { useCreateCategoryMutation } from "@/store/rtk/category.service";
import { UploadCloud } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";

// Define the Zod schema
const categorySchema = z.object({
  name: z.string().min(1, "Tên danh mục không được để trống."),
  description: z.string().min(1, "Mô tả không được để trống."),
  thumbnail: z.custom(
    (file) => file instanceof File && file.type.startsWith("image/"),
    {
      message: "Vui lòng tải lên một tệp hình ảnh hợp lệ."
    }
  )
});

const CategoriesModalBody = ({ row, isAddOrChange }) => {
  const fileInputRef = useRef(null);
  const [fileSlt, setFileSlt] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryThumbnail, setCategoryThumbnail] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    console.log("CategoriesModalBody: rowData", row);
  }, [row]);

  const fetchCategoryDetails = async () => {
    const categoryData = await Promise.resolve({
      name: "Danh mục mẫu",
      description: "Mô tả danh mục mẫu",
      thumbnail: "https://m.media-amazon.com/images/I/21kRx-CJsUL.png" // Replace with actual image URL from API
    });
    setCategoryName(categoryData.name);
    setCategoryDescription(categoryData.description);
    setCategoryThumbnail(categoryData.thumbnail);
  };

  const [createCategory, { isLoading, isSuccess, isError }] =
    useCreateCategoryMutation();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileSlt(file || null);
  };

  const handleFormSubmit = async () => {
    const payload = {
      name: categoryName,
      description: categoryDescription,
      thumbnail: fileSlt
    };

    const result = categorySchema.safeParse(payload);

    if (!result.success) {
      const errors = {};
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFormErrors(errors);
      return;
    }

    try {
      await createCategory(payload).unwrap();
      alert(
        isAddOrChange
          ? "Category created successfully!"
          : "Category updated successfully!"
      );
    } catch (error) {
      alert("Failed to submit category!");
    }
  };

  useState(() => {
    if (!isAddOrChange) {
      fetchCategoryDetails();
    }
  }, [isAddOrChange]);

  return (
    <div>
      <div className="mt-4 flex flex-col gap-5">
        {/* Tên danh mục */}
        <div className="name">
          <label className="block text-md font-medium mb-2">
            Tên danh mục<span className="text-red-500">*</span>
          </label>
          {isAddOrChange ? (
            <input
              type="text"
              className={`w-full border ${
                formErrors.name ? "border-red-500" : "border-gray-600"
              } rounded-md px-3 py-2`}
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          ) : (
            <p className="text-lg font-semibold">{categoryName}</p>
          )}
          {formErrors.name && (
            <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
          )}
        </div>

        {/* Mô tả */}
        {isAddOrChange && (
          <div className="desc">
            <label className="block text-md font-medium mt-4 mb-2">
              Mô tả<span className="text-red-500">*</span>
            </label>
            <textarea
              className={`w-full border ${
                formErrors.description ? "border-red-500" : "border-gray-600"
              } rounded-md px-3 py-2`}
              placeholder="Enter category description"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            ></textarea>
            {formErrors.description && (
              <p className="text-sm text-red-500 mt-1">
                {formErrors.description}
              </p>
            )}
          </div>
        )}

        {/* Ảnh đại diện */}
        <div
          className={`${
            formErrors.thumbnail
              ? "border-red-500 bg-red-50"
              : "border-gray-600"
          } py-4 border-2 border-dashed mt-3 flex flex-col gap-2 items-center justify-center`}
        >
          <label className="block text-md font-medium mt-4">Ảnh đại diện</label>
          {categoryThumbnail && !fileSlt ? (
            <img
              src={
                categoryThumbnail ||
                "https://m.media-amazon.com/images/I/21kRx-CJsUL.png"
              }
              alt="Thumbnail"
              className="w-24 h-24 object-cover rounded-md"
            />
          ) : !fileSlt ? (
            <p className="text-sm text-red-500">Chưa có hình ảnh.</p>
          ) : (
            <p className="text-sm text-green-600">{fileSlt.name}</p>
          )}
          <div
            onClick={() => handleUploadClick()}
            className="cursor-pointer hover:bg-primary-600 text-black transition-all px-[16px] py-[12px] flex items-center gap-2 bg-gray-500 rounded-[8px] hover:text-white mt-2"
          >
            <UploadCloud />
            <p>{isAddOrChange ? "Tải lên ảnh" : "Tải ảnh"}</p>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {formErrors.thumbnail && (
            <p className="text-sm text-red-500 mt-1">{formErrors.thumbnail}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="buttons flex justify-end gap-[10px]">
          <Button className="w-1/4" onClick={handleFormSubmit}>
            {isAddOrChange ? "Xác nhận" : "Cập nhật"}
          </Button>
        </div>

        {/* Error/Success messages */}
        {isError && (
          <p className="text-sm text-red-500 mt-2">
            Failed to submit category.
          </p>
        )}
        {isSuccess && (
          <p className="text-sm text-green-500 mt-2">
            {isAddOrChange
              ? "Category created successfully!"
              : "Category updated successfully!"}
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoriesModalBody;
