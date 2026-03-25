"use client"

import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function YearSelect({year,setYear}) {
  const startYear = 2015
  const currentYear = new Date().getFullYear()

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => String(currentYear - i)
  )

  

  return (
    <div className="ml-auto flex flex-col gap-1 w-fit m-2">
      <label className="text-sm font-medium text-muted-foreground">
        Select Year
      </label>

      <Select value={year} onValueChange={setYear}>
        <SelectTrigger className="h-9">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>

        <SelectContent>
          {years.map((y) => (
            <SelectItem
              key={y}
              value={y}
              className="cursor-pointer focus:bg-emerald-600 focus:text-white data-[highlighted]:bg-emerald-600 data-[highlighted]:text-white"
            >
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
