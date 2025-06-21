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
import { getMonth, getYear, setMonth, setYear } from "date-fns";

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
  const [date, setDate] = useState(field.value ? new Date(field.value) : new Date());
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(date); // 👈 ควบคุมเดือนที่แสดงใน Calendar

  const months = [...Array(12).keys()].map(i => format(new Date(0, i), "MMMM"));
  const years = Array.from({ length: 2028 - 1990 + 1 }, (_, i) => 1990 + i);

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setCurrentMonth(selectedDate); // 👈 ให้แสดงเดือนที่เลือกด้วย
      field.onChange(selectedDate);
      setOpen(false);
    }
  };

  const handleMonthChange = (month) => {
    const newDate = setMonth(currentMonth, months.indexOf(month));
    setCurrentMonth(newDate); // 👈 update เดือนของ Calendar
    setDate(newDate);         // 👈 update date (optional)
    field.onChange(newDate);
  };

  const handleYearChange = (year) => {
    const newDate = setYear(currentMonth, parseInt(year));
    setCurrentMonth(newDate); // 👈 update ปีของ Calendar
    setDate(newDate);         // 👈 update date (optional)
    field.onChange(newDate);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd MMM yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-between p-2">
          <Select onValueChange={handleMonthChange} value={months[getMonth(currentMonth)]}>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleYearChange} value={getYear(currentMonth).toString()}>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          month={currentMonth} // 👈 บังคับให้ calendar เปลี่ยนตาม
          onMonthChange={setCurrentMonth} // 👈 อัปเดตเมื่อ user กดเปลี่ยนเดือนใน Calendar
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}



