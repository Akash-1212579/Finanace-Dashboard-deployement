import React from 'react'
import { ArrowDownRight, ArrowUpRight, Plus, FileText, Upload } from "lucide-react";
import SummaryCards from '../../transactions/pages/SummaryCards';
import { Link } from "react-router-dom";
import AddTransactionPopup from './AddNewTransaction';
import ImportBankStatementSection from './ImportBankStatementSection';

export default function Dashboard() {
  return(
        <div className="min-h-screen bg-white text-slate-900 p-6">
      
      {/* SUMMARY CARDS */}
   
       <SummaryCards/>
      

      {/* QUICK ACTIONS */}
      

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-5 mb-10">
        {/* <ActionCard
  to="/transactions/new"
  icon={<Plus />}
  title="Add Transaction"
  description="Log income or expense quickly"
/> */}
<AddTransactionPopup/>
<ActionCard
  to="/analytics"
  icon={<FileText />}
  title="View Reports"
  description="Analyze spending patterns"
/>

<ActionCard
  to="/vault"
  icon={<Upload />}
  title="Import CSV"
  description="Upload bank statements"
/>

      </div>

      {/* RECENT TRANSACTIONS */}
     <ImportBankStatementSection/>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SummaryCard({ title, value, type, highlight }) {
  const color =
    type === "income"
      ? "text-emerald-600"
      : type === "expense"
      ? "text-red-500"
      : "text-slate-900";

  return (
    <div
      className={`rounded-xl p-5 border ${
        highlight
          ? "border-emerald-500 bg-emerald-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className={`text-2xl font-bold mt-2 ${color}`}>{value}</h3>
    </div>
  );
}

function ActionCard({ icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="block rounded-xl border border-slate-200 bg-white p-6
                 flex items-start gap-4
                 hover:border-emerald-500 hover:shadow-sm
                 transition-all cursor-pointer"
    >
      <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </Link>
  );
}

function TransactionItem({ name, amount, date, expense }) {
  return (
    <li className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-none">
      <div>
        <p className="font-medium text-slate-800">{name}</p>
        <span className="text-xs text-slate-500">{date}</span>
      </div>

      <div
        className={`flex items-center gap-1 font-semibold ${
          expense ? "text-red-500" : "text-emerald-600"
        }`}
      >
        {expense ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
        {amount}
      </div>
    </li>
  );
}
  