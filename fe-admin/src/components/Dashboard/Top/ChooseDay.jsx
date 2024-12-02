"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "7 ngày qua",
    label: "7 ngày qua"
  },
  {
    value: "30 ngày qua",
    label: "30 ngày qua"
  },
  {
    value: "1 năm qua",
    label: "1 năm qua"
  }
];

export function ChooseDayComboBox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("7 ngày qua");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between text-black-300"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "7 ngày qua"}
          <ChevronDown size={20} className="text-black-300 ml-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>Có lỗi xảy ra</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
