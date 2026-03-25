"use client"

import * as React from "react"
import { Pie, PieChart, Label } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import api from "../../transactions/pages/axiosInstance"

export default function CategoryPieChart() {
  const [loading, setLoading] = React.useState(true)
  const [categorizedData, setCategorizedData] = React.useState([])
  const [error, setError] = React.useState(null)

 
  React.useEffect(() => {
    let mounted = true

    async function fetchCategorizedAmounts() {
      try {
        const res = await api.get("/gettotalamountforcategory");
        
        //console.log(res.data.result);
        if (mounted) {
          setCategorizedData(Array.isArray(res.data?.result) ? res.data.result : [])
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.message || "Failed to fetch data")
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchCategorizedAmounts()

    return () => {
      mounted = false
    }
  }, [])
const emeraldShades = [
  "#d1fae5", // lightest
  "#a7f3d0",
  "#6ee7b7",
  "#34d399",
  "#10b981", // darkest
]

 
  const chartData = React.useMemo(() => {
    if (!Array.isArray(categorizedData)) return []

    return categorizedData.map((item, index) => ({
      category: item.name ?? "Unknown",
      amount: Number(item.amount) || 0,
       fill: emeraldShades[index % emeraldShades.length],
    }))
  }, [categorizedData])

  /* -------------------------------
     3. Chart config (MUST MATCH dataKey)
  -------------------------------- */
  const chartConfig = {
    amount: {
      label: "Amount",
    },
  }

  /* -------------------------------
     4. Total calculation
  -------------------------------- */
 const totalAmount = React.useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.amount, 0)
  }, [chartData]);

  /* -------------------------------
     5. UI states
  -------------------------------- */
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
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending By Category</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox?.cx || !viewBox?.cy) return null

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        ₹{totalAmount.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy + 24}
                        className="fill-muted-foreground"
                      >
                        Total
                      </tspan>
                    </text>
                  )
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div>Total Expenses: ₹{totalAmount.toLocaleString()}</div>
      </CardFooter>
    </Card>
  )
}