import React from "react";
import CategoryPieChart from "./CategoryPieChart";
import ModeBarGraph from "./ModeBarGraph";
import MonthlyExpenseLineGraph from "./MonthlyExpenseLineGraph";
import { useState } from "react";
import YearSelect from "./YearSelect";
export default function Analytics() {
    const currentYear = new Date().getFullYear()

  const [year, setYear] = useState(String(currentYear))
  return (
    <div className="sm:w-[97%]  flex flex-col sm:flex-col gap-3 m-3">
      <div className="sm:w-[97%]  flex flex-col sm:flex-row gap-3 m-3">
        <div className="w-full sm:w-1/2">
          <CategoryPieChart />
        </div>
        <div className="w-full sm:w-[50%]">
          <ModeBarGraph />
        </div>
      </div>
      <div className="w-full sm:w-full ">
        <YearSelect year={year} setYear={setYear}/>
        <MonthlyExpenseLineGraph year={year}/>
      </div>
      
    </div>
  );
}
