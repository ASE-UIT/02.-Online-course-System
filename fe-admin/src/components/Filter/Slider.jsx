import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
const AdminSlider = ({lable, onNumberChanged}) => {
    const [range, setRange] = useState([0, 10000]);
    const handleValueChange = (value) => {
      setRange(value);
      onNumberChanged(value);
    };
  
    return (
      <div className="w-full max-w-md ">
        <label className="block text-text/md/medium mb-2">{lable}</label>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={range}
          onValueChange={handleValueChange}
          min={0}
          max={1000}
          step={1}
          aria-label="Number Range"
        >
          <Slider.Track className="bg-gray-300 relative grow rounded-full h-2">
            {/* Range highlight */}
            <Slider.Range className="absolute bg-primary-500 rounded-full h-full" />
          </Slider.Track>
  
          {/* Handle for the minimum value */}
          <Slider.Thumb className="block w-5 h-5 bg-white rounded-full border-2 border-primary-color focus:outline-none focus:ring-2 focus:ring-primary-600" />
  
          {/* Handle for the maximum value */}
          <Slider.Thumb className="block w-5 h-5 bg-white rounded-full border-2 border-primary-color focus:outline-none focus:ring-2 focus:ring-primary-600" />
        </Slider.Root>
  
        {/* Display the selected range */}
        <div className="flex justify-between text-text/md/semibold mt-2">
          <span>{range[0]}</span>
          <span>{range[1]}</span>
        </div>
      </div>
    );
  };
  
  export default AdminSlider;