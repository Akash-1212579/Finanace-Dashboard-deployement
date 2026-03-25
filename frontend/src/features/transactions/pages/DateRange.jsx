"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function DateRangeFilter({ onChange }) {
  const [open, setOpen] = React.useState(false)

  const [dateRange, setDateRange] = React.useState({
    from: undefined,
    to: undefined,
  })

  const handleSelect = (range) => {
    setDateRange(range)

 
    if (range?.from && range?.to) {
      onChange({
        startDate: range.from,
        endDate: range.to,
        
      })
      
      setOpen(false)
    }
  }
console.log("from",dateRange.from);
console.log("to",dateRange.to);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[260px] justify-between text-left font-normal"
        >
          {dateRange.from && dateRange.to ? (
            <>
              {format(dateRange.from, "dd MMM yyyy")} –{" "}
              {format(dateRange.to, "dd MMM yyyy")}
            </>
          ) : (
            "Select date range"
          )}
          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto bg-emerald-300 p-0" align="start">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={dateRange}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
