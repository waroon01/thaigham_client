import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function FormDynamic2({ fields, form }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {fields.map((field) => (
        <div key={field.name} className={`w-full ${field.colSpan || "col-span-1"}`}>
          <FormField control={form.control} name={field.name} render={({ field: controllerField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                {renderInput(field, controllerField)}
              </FormControl>
              {field.description && (
                <FormDescription>{field.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )} />
        </div>
      ))}
    </div>
  );
}

function renderInput(fieldConfig, field) {
  const { type, options, placeholder } = fieldConfig;

  switch (type) {
    case "text":
    case "email":
    case "password":
      return <Input type={type} placeholder={placeholder} {...field} />;
    case "textarea":
      return <Textarea placeholder={placeholder} {...field} />;
    case "select":
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "date":
      return (
        <DatePickerInput field={field} />
      );
    default:
      return <Input placeholder={placeholder} {...field} />;
  }
}

function DatePickerInput({ field }) {
  const [date, setDate] = useState(field.value ? new Date(field.value) : null);
  const [open, setOpen] = useState(false); // เพิ่มสถานะ open เพื่อควบคุมการเปิดปิด

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    field.onChange(selectedDate); // อัปเดตค่าในฟอร์ม
    setOpen(false); // ปิด Popover หลังจากเลือกวันที่
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[100%] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

