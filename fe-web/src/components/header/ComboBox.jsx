"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { FaAngleDown } from "react-icons/fa6"
import { FaAngleUp } from "react-icons/fa6";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const frameworks = [
  {
    value: "course",
    label: "Trọn gói khóa học",
  },
  {
    value: "lesson",
    label: "Bài học",
  },
  {
    value: "train",
    label: "Ôn thi cấp tốc",
  },
  {
    value: "English_Speaking",
    label: "Speaking tiếng Anh cơ bản",
  },
  {
    value: "English_Writing",
    label: "Writing tiếng Anh cơ bản",
  },
]

export function Combobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full sm:w-[150px] md:w-[200px] justify-between"
            onClick={() => setOpen(!open)}
            >
            {value
                ? frameworks.find((framework) => framework.value === value)?.label
                : "Danh mục"}
            {open ? <FaAngleUp /> : <FaAngleDown />}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full md:w-[200px] p-0 z-50">
        <Command>
          
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
