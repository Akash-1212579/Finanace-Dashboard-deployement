import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import api from "./axiosInstance";
import { useState , useEffect} from "react";


export default function SummaryCards() {
const [income,setIncome] = useState(0);
const[incomeLoading,setIncomeLoading] = useState(true);
const[incomeError,setIncomeError] = useState(null);

const [expense,setExpense] = useState(0);
const[expenseLoading,setExpenseLoading] = useState(true);
const[expenseError,setExpenseError] = useState(null);
  //api call for total income 
  useEffect(()=>{
    async function getTotalIncome() {
      try {
     const res = await api.get("/gettotalamount/credit");
     setIncome(res.data.creditedAmount ||0);
    } catch (error) {
      console.log("error for summary cards",error.message);
      setIncomeError(error.response?.data?.message || "Failed to fetch Income");
    }
    finally{
      setIncomeLoading(false);
    }
    }
    getTotalIncome();
  },[]);

  useEffect(()=>{
    async function getToatlExpense() {
      try {
        const res = await api.get("/gettotalamount/debit")
        setExpense(res.data.debitedAmount ||0);
      } catch (error) {
        console.log("expense error",error.message);
        setExpenseError(error.response?.data?.message || "Failed to fetch Expense")
      }
      finally{
        setExpenseLoading(false);
      }
    }
    getToatlExpense();
  },[]);
  console.log("Income",income);
  console.log("Expense",expense);
  return (
    <div className=" mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      {/* Total Income */}
      <div className="
        bg-white
        rounded-xl
        px-4 py-3
        sm:px-5 sm:py-4
        flex items-center gap-3
        border border-gray-100
        shadow-sm
        hover:-translate-y-[2px]
        transition-all duration-200 ease-out
        border border-gray-200
        hover:border-slate-500

      ">
        <div className="
          h-8 w-8
          sm:h-9 sm:w-9
          rounded-lg
          bg-emerald-100
          flex items-center justify-center
          shrink-0
        ">
          <ArrowDownRight className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
        </div>

        <div>
          <p className="text-xs sm:text-sm text-gray-500">
            Total Income
          </p>
          <p className="text-lg sm:text-xl font-semibold text-emerald-600 leading-tight">
          {incomeLoading && "Loading..."}
          {incomeError && "Failed to load Incomes"}
          {!incomeError && !incomeLoading && "₹ "+income }
          </p>
        </div>
      </div>

      {/* Total Expenses */}
      <div className="
        bg-white
        rounded-xl
        px-4 py-3
        sm:px-5 sm:py-4
        flex items-center gap-3
        border border-gray-100
        shadow-sm
        hover:-translate-y-[2px]
        transition-all duration-200 ease-out
        border border-gray-200
        hover:border-slate-500
      ">
        <div className="
          h-8 w-8
          sm:h-9 sm:w-9
          rounded-lg
          bg-red-100
          flex items-center justify-center
          shrink-0
        ">
          <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
        </div>

        <div>
          <p className="text-xs sm:text-sm text-gray-500">
            Total Expenses
          </p>
          <p className="text-lg sm:text-xl font-semibold leading-tight text-red-500">
  {expenseLoading && "Loading..."}
  {expenseError && "Failed to load expense"}
  {!expenseLoading && !expenseError && "₹ "+expense}
</p>

        </div>
      </div>

    </div>
  );
}
