import { deleteCategory } from "@/api/courseApi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const RemoveCategories = ({ row, handleClostDialog, setLoading, reload }) => {
  const { toast } = useToast();
  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const res = await deleteCategory(row.id);
      if (res.status === 200) {
        toast({
          title: "Xóa danh mục thành công",
          type: "success"
        });
        handleClostDialog();
      }
      setLoading(false);
    } catch (error) {
      console.error("Xóa danh mục thất bại", error);
      setLoading(false);
      toast({
        title: "Xóa danh mục thất bại",
        type: `error: ${error}`
      });
    }
  };

  return (
    <div>
      <div className="buttons flex justify-end gap-[10px]">
        <Button
          className="w-1/4 bg-error-500 hover:bg-error-600"
          onClick={handleFormSubmit}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
};

export default RemoveCategories;
