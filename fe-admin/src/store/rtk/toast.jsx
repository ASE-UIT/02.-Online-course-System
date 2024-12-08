import { toast } from "@/hooks/use-toast";

export const showToast = ({ type, msg, desc }) => {
  if (type === "success") {
    toast({
      title: <p className=" text-green-700">{msg}</p>,
      description: desc,
      status: "success",
      duration: 2000,
    });
  } else if (type === "error") {
    toast({
      title: <p className=" text-red-700">{msg}</p>,
      description: desc,
      duration: 2000,
    });
  }
};
