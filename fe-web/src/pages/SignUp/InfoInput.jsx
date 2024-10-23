import { Link, useNavigate } from "react-router-dom";
import { useScrollToTop } from "@/hooks";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string().min(2, {
    message: "Tên phải có ít nhất 2 ký tự."
  })
});

function InfoInput() {
  useScrollToTop();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: ""
    }
  });

  function onSubmit(values) {
    console.log(values);
    navigate(`/result/callback`);
  }

  return (
    <section className="w-full h-screen">
      <section className="pt-20 flex gap-10 justify-center items-center px-10 py-10 self-stretch bg-gray-100">
        <div className="flex gap-10 p-10 justify-center items-center border rounded-[40px] bg-white shadow-[0px_8px_72.4px_0px_rgba(0,0,0,0.13)]">
          <div className="flex flex-col items-center text-center space-y-5">
            <h1 className="text-2xl font-bold text-display/lg/semibold">
              Một bước nữa...
            </h1>

            <div>
              <p className="text-text/md/regular text-black-500">
                Thay đổi họ và tên của bạn
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text/md/medium flex justify-start">
                          Họ
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-gray-600"
                            autoComplete="given-name"
                            placeholder={field.value}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text/md/medium flex justify-start">
                          Tên<span className="text-error-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-gray-600"
                            autoComplete="family-name"
                            placeholder={field.value}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Link to={"/result/callback"}>
                  <Button
                    type="submit"
                    className="w-[240px] rounded-xl shadow-[3px_10px_20px_0px_rgba(0,56,255,0.38)]"
                  >
                    Tiếp tục
                  </Button>
                </Link>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </section>
  );
}

export default InfoInput;
