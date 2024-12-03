import { Popover } from "@radix-ui/react-popover";

import { PopoverContent, PopoverTrigger } from "../ui/popover";

export default function Select({ parent, options, onClickItem, childClassName = "", childRowClassName = "" }) {
  return (
    <Popover>
      <PopoverTrigger asChild>{parent}</PopoverTrigger>
      <PopoverContent className={`w-[220px] ${childClassName}`}>
        {options.map((el, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                if (onClickItem) {
                  onClickItem(el);
                }
              }}
              className={`px-4 py-2 cursor-pointer rounded-[4px] transition-all hover:bg-gray-400 ${childRowClassName}`}
            >
              {el?.icon && <div>{el.icon}</div>}
              <div>{el.label}</div>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
