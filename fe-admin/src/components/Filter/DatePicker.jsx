import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";

const DatePickerWithForm = () => {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

  const startDate = watch("startDate");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
      <label className="text-md font-semibold text-black">Ngày nộp đơn</label>
      <div className="space-y-4">
        {/* Start Date Picker */}
        <div className="flex items-center gap-4">
          <label className="w-1/4 text-sm font-medium text-black">Từ ngày</label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center justify-between pl-3 pr-2 border-gray-600 border text-sm font-normal w-full"
                  >
                    {field.value ? format(field.value, "PPP") : "Select Start Date"}
                    <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[1050]" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        {/* End Date Picker */}
        <div className="flex items-center gap-4">
          <label className="w-1/4 text-sm font-medium text-black">Đến ngày</label>
          <Controller
            name="endDate"
            control={control}
            rules={{
              validate: (value) =>
                !value || (startDate && value >= startDate) || "End date must be after start date",
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center justify-between pl-3 pr-2 border-gray-600 border text-sm font-normal w-full"
                    >
                      {field.value ? format(field.value, "PPP") : "Select End Date"}
                      <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-[1050]" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (startDate && date < startDate) {
                          setValue("endDate", null);
                          return alert("End date cannot be earlier than start date!");
                        }
                        field.onChange(date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
              </>
            )}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default DatePickerWithForm;
