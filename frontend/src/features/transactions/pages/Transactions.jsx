import React from "react";
import SummaryCards from "./SummaryCards";
import FilterBar from "./FilterSection";
import { useState , useEffect} from "react";
import TransactionsTable from "./TransactionsTable";
import api from "./axiosInstance";
import DateRangeFilter from "./DateRange";

export default function Transactions() {
  // const [search, setSearch] = useState("");
  // const [type, setType] = useState("");
  // const[category,setCategory] = useState("");
  // const[mode,setMode] = useState("");
  

const [filters, setFilters] = useState({
  search: "",
  type: "",
  category: "",
  mode: "",
});

 const handleFilterChanges = (key, value) => {
  setFilters(prev => ({
    ...prev,
    [key]: value,
  }));
};


// console.log("from ",filters.startDate);
// console.log("to ",filters.endDate);
  const[transactions,setTransactions] = useState([]);  // this is a original data or all transactions
//  const[filteredTransactions,setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //checjng for a filter is active or not
const hasAciveFilter = Object.values(filters).some(val=> val!=null && val!="");


  useEffect(()=>{
    async function fetchTransactions() {
      try {
        const token = sessionStorage.getItem("token");
        const res = hasAciveFilter ? await api.get(`/getfilteredtransactions?type=${filters.type}&category=${filters.category}&mode=${filters.mode}`)
                                     :await api.get("/gettransactions")
          setTransactions(res.data.transactions);
         // setFilteredTransactions(res.data.transactions);
          //console.log("transactions are",res.data.transactions);
      } 
      catch (error) {
        console.log(error.message);
        setError(
          error.response?.data?.message || "Failed to fetch transactions"
        );
      }
      finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  },[filters.category,filters.mode,filters.type,filters.startDate,filters.endDate,open])

  // // now performing a side effect for a filtration according ti the filter
  // useEffect(()=>{
    
  // },[filters,transactions])
  



  return (
    <div className="h-full h-screen flex flex-col">
      <div className="w-full p-1">
        <SummaryCards/>
       
       {/* <FilterBar
  search={search}
  setSearch={setSearch}
  type={type}
  setType={setType}
  category = {category}
  setCategory = {setCategory}
  mode = {mode}
  setMode = {setMode}
/> */}
  <FilterBar filters={filters} handleFilterChanges={handleFilterChanges}
  />
     
      </div>
    <div className="w-full">
    <TransactionsTable transactions={transactions} /> 
    </div>
      
    </div>
  );
}
