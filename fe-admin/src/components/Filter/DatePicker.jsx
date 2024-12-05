import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";

const DatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleEndDateSelect = (date) => {
    if (startDate && date < startDate) {
      alert("End date cannot be earlier than start date!");
    } else {
      setEndDate(date);
    }
  };

  return (
    <div className="w-full flex flex-col gap-[20px]">
      <label className="text-text/md/semibold text-black">Ngày nộp đơn</label>
      <div className="flex gap-[10px] items-center flex-col">
        <div className="flex w-full items-center">
          <label className="text-text/md/semibold text-black w-1/2">Từ ngày</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="pl-3 text-left font-normal border-gray-600 border-[1px] w-1/2"
              >
                {startDate ? format(startDate, "PPP") : "Select Start Date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                className="border-gray-300"
                selected={startDate}
                onSelect={setStartDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex w-full items-center">
          <label className="text-text/md/semibold text-black w-1/2">Đến ngày</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="pl-3 text-left font-normal border-gray-600 border-[1px] w-1/2"
              >
                {endDate ? format(endDate, "PPP") : "Select End Date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                className="border-gray-300"
                selected={endDate}
                onSelect={handleEndDateSelect}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
