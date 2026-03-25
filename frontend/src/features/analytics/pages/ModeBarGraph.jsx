"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect } from "react";
import api from "../../transactions/pages/axiosInstance";
import { useState } from "react";

export const description = "A bar chart with a label";



const chartConfig = {
  desktop: {
    label: "Amount",
    color: "var(--chart-1)",
  },
};
const PAYMENT_MODES = [
  "ATM",
  "NEFT",
  "IMPS",
  "UPI",
  "CASH",
  "UNKNOWN",
];


export default function ModeBarGraph() {
// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];
 const [data,setData] = useState([]);
const [loading,setLoading] = useState(true);
const[error,setError] = useState(null);

useEffect(()=>{
    let mounted = true;
    async function getAmountForModes() {
        try {
            const res = await api.get("/getamountbymode");
            console.log("Mode Amounts are",res.data.result);
            setData(Array.isArray(res.data.result)?res.data.result:[]);
        } catch (error) {
            console.log("error for getAmountForMode is ",error.message);
            setError("Failed to fetch data");
        }
        finally{
                setLoading(false);
        }
    }
    getAmountForModes();
    if(mounted)
    {
        return()=>{
            mounted = false;
        }
    }
    
},[]);
   const chartData = React.useMemo(() => {
  if (!Array.isArray(data)) return [];

  // create new array and initially filling with 0
  const modeMap = PAYMENT_MODES.reduce((acc, mode) => {
    acc[mode] = 0;
    return acc;
  }, {});

  //  fill values from backend
  data.forEach((item) => {
    const mode = item.paymentMode?.toUpperCase() || "UNKNOWN";
    modeMap[mode] = item._sum?.amount ?? 0;
  });

  // convert to chart-friendly array
  return PAYMENT_MODES.map((mode) => ({
    mode,
    amount: modeMap[mode],
  }));
}, [data]);
const totalAmount = React.useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.amount, 0)
  }, [chartData]);
  //error handling and loading handling
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

if (!chartData.length) {
  return (
    <Card>
      <CardContent className="py-10 text-center text-sm text-gray-500">
        No data available
      </CardContent>
    </Card>
  );
}

  return (
  <Card>
    <CardHeader>
      <CardTitle>Spendings By Payment Mode</CardTitle>
    </CardHeader>

    <CardContent>
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData} margin={{ top: 20 }}>
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="mode"            // ✅ FIXED
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <Bar
            dataKey="amount"          // ✅ FIXED
            fill="var(--color-desktop)"
            radius={8}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>

    <CardFooter className="flex-col gap-2 text-sm">
      <p>
        Total Spending{" "}
        <span className="font-medium">
          ₹{totalAmount}
        </span>
      </p>
    </CardFooter>
  </Card>
);

}
