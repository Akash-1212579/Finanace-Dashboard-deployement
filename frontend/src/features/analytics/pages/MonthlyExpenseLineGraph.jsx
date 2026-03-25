"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import YearSelect  from "./YearSelect"
import api from "../../transactions/pages/axiosInstance"

export const description = "A multiple line chart"

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
}

export default function MonthlyExpenseLineGraph({year}) {
    console.log("selected year is ",year);
const[monthlyAmount,setMonthlyAmount] = useState([]);
const[loading,setLoading] = useState(true);
const[error,setError] = useState(false);
    useEffect(()=>{
        async function getMonthlyAmountsForYear() {
            try {
                const res =await api.get(`getmonthlyamountforyear?year=${year}`)
                setMonthlyAmount(res.data.result);
                console.log(`monthly data for year ${year}`,res.data.result);
            } catch (error) {
                console.log("error from monthly amount comp.",error.message);
                setError("Failed to fetch Date Refresh Page");
            }
            finally{
                setLoading(false);
            }
        }
        getMonthlyAmountsForYear();
    },[year])
    
if (loading) {
  return (
    <Card>
      <CardContent className="py-10 text-center text-sm text-gray-500">
        Loading chart...
      </CardContent>
    </Card>
  );
}

if (error) {
  return (
    <Card>
      <CardContent className="py-10 text-center text-sm text-red-500">
        {error}
      </CardContent>
    </Card>
  );
}

if (!monthlyAmount.length) {
  return (
    <Card>
      <CardContent className="py-10 text-center text-sm text-gray-500">
        No data available
      </CardContent>
    </Card>
  );
}

  return (
    <div className="w-[100%]">
        {/* <div className="flex justify-end"><YearSelect/></div> */}
        
<Card>
      <CardHeader>
        <CardTitle>Monthly Spendings</CardTitle>
        <CardDescription>January - December {year}</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={monthlyAmount}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />

            <Line
              dataKey="total"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />

            <Line
              dataKey="total"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground leading-none">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
    </div>
    
  )
}
