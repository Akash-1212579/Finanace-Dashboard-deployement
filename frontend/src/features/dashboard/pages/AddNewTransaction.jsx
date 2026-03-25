"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input as ShadInput } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import api from "../../transactions/pages/axiosInstance";

export default function AddTransactionPopup({ onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    paymentMode: "",
    category: "",
    date: "",
    description: "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const isValidForm = Object.values(formData).every(data=>data.trim()!="");
      if(!isValidForm)
      { setError("Please Enter All Details Of Transaction")
        return;
      }
      const res = await api.post("/addtransaction", {
        ...formData,
        amount: Number(formData.amount),
        balanceAfterTxn: 1212,
        rawData: { "this data from": "user input" },
      });

     

      const savedTransaction =res.data;

      // notify parent if needed
      onSuccess?.(savedTransaction);

      // reset & close
      setFormData({
        amount: "",
        type: "",
        category: "",
        date: "",
        description: "",
      });
      setOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TRIGGER CARD */}
      <div
        onClick={() => setOpen(true)}
        className="rounded-xl border border-slate-200 bg-white p-6
                   flex items-start gap-4 cursor-pointer
                   hover:border-emerald-500 hover:shadow-sm transition-all"
      >
        <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600">
          <Plus />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">Add Transaction</h4>
          <p className="text-sm text-slate-500">Log income or expense</p>
        </div>
      </div>

      {/* POPUP */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl p-6 mx-4">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                New Transaction
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-1"
            >
              {/* AMOUNT */}
              <Field label="Amount">
                <ShadInput
                  type="number"
                  placeholder="₹0.00"
                  value={formData.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                />
              </Field>

              {/* TYPE */}
              <Field label="Type">
                <Select
                  value={formData.type}
                  onValueChange={(v) => handleChange("type", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DEBIT">DEBIT</SelectItem>
                    <SelectItem value="CREDIT">CREDIT</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              {/* PAYMENT MODE */}
              <Field label="Payment Mode">
                <Select
                  value={formData.paymentMode}
                  onValueChange={(v) => handleChange("paymentMode", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ATM">ATM</SelectItem>
                    <SelectItem value="NEFT">NEFT</SelectItem>
                    <SelectItem value="IMPS">IMPS</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="CASH">CASH</SelectItem>
                    <SelectItem value="UNKNOWN">UNKNOWN</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* CATEGORY */}
              <Field label="Category">
                <Select
                  value={formData.category}
                  onValueChange={(v) => handleChange("category", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Food",
                      "Shopping",
                      "Transport",
                      "Utilities",
                      "Entertainment",
                      "Healthcare",
                      "Other",
                    ].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              {/* DATE */}
              <Field label="Date">
                <ShadInput
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </Field>

              {/* DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="text-sm text-slate-600">Description</label>
                <Textarea
                  rows={3}
                  className="mt-1"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              {error && (
                <p className="md:col-span-2 text-sm text-red-500">{error}</p>
              )}

              {/* ACTIONS */}
              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- HELPER ---------- */

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
