import { Search, Filter } from "lucide-react";
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select";
// import DateRangeFilter from "./DateRange";
import React from "react";
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function FilterBar({filters,handleFilterChanges}) 
{   console.log("selected category is ",filters.category);
    console.log("selected mode is",filters.mode);
    console.log("selected payment type is",filters.type);
    
      


  return (
    <div
      className=" mt-5 w-full
        bg-white
        rounded-xl
        p-4
        flex
        flex-col
        sm:flex-row
        gap-4
        items-stretch
        
        justify-between
        border
        border-gray-100
        shadow-sm
        hover:-translate-y-[2px]
        transition-all duration-200 ease-out
        border border-gray-200
        hover:border-slate-500
      "
    >
      {/* Search */}
      {/* <div className="flex relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2  h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          name="search"
          value={filters.search}
          onChange={handleFilterChanges}
          className="
            w-full
            pl-9
            pr-3
            py-2
            text-sm
            rounded-lg
            border
            border-gray-200
            focus:outline-none
            focus:ring-2
            focus:ring-emerald-500/20
            focus:border-emerald-500
          "
        />
      </div> */}
      {/* to sleect date range */}
     
    {/* filter for category */}

    <div className="sm:flex-1">
     <Select value={filters.category} onValueChange={(value)=>handleFilterChanges("category",value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="Food">Food</SelectItem>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="Transport">Transport</SelectItem>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="Utilities">Utilities</SelectItem>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      " 
      value="Entertainment">Entertainment</SelectItem>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="Shopping">Shopping</SelectItem>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="Healthcare">Healthcare</SelectItem>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="Other">Other</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>

    </div>
    {/* filter for payment mode */}
    <div>
        <Select value={filters.mode} onValueChange={(value)=>handleFilterChanges("mode",value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Payment mode" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          <SelectLabel>Payment Mode</SelectLabel>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="UPI">UPI</SelectItem>
       <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="CASH">CASH</SelectItem>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="NEFT">NEFT</SelectItem>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="ATM">ATM</SelectItem>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      " 
      value="IMPS">IMPS</SelectItem>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="Unknown">Unknown</SelectItem>
         
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>


      {/* Type of payment Filter (income/expense) */}
      <div>
        <Select value={filters.type} onValueChange={(value)=>handleFilterChanges("type",value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Payment Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="w-full">
          <SelectLabel>Payment Type</SelectLabel>
          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="DEBIT">DEBIT</SelectItem>

          <SelectItem className="
        focus:bg-emerald-600 
        focus:text-white
        data-[state=checked]:bg-emerald-600
        data-[state=checked]:text-white
      "
       value="CREDIT">CREDIT</SelectItem>        
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>
     
    </div>
  );
}
