import React from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from 'react';
import api from '../transactions/pages/axiosInstance';

function AddBank() {
  const [formData, setFormData] = useState({
    name: "",
    bankName: "",
    accountNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
    } else if (!/^\d{4,4}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Enter valid account number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    console.log("submit clicked for baknk details")
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const res = await api.post("/bankaccount",formData);
        console.log(res);   
    } catch (err) {
      setServerError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white px-6 py-12 flex justify-start ml-20">
      <div className="w-full max-w-lg">

        <h1 className="text-3xl font-bold text-[#0f172a] mb-10">
          Bank Details
        </h1>

        {serverError && (
          <p className="text-red-600 mb-4 text-sm">{serverError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

         
          <div>
            <label className="text-sm text-[#0f172a] opacity-70">
              Account Holder Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-300 focus:border-emerald-500 outline-none py-2 text-[#0f172a]"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
  <label className="text-sm text-[#0f172a] opacity-70">
    Bank Name
  </label>

  <Select
    value={formData.bankName}
    onValueChange={(value) => {
      setFormData({ ...formData, bankName: value });
      setErrors({ ...errors, bankName: "" });
    }}
  >
    <SelectTrigger className="w-full bg-transparent  focus:ring-0 focus:border-emerald-800 text-[#0f172a]">
      <SelectValue placeholder="Select bank" />
    </SelectTrigger>

    <SelectContent className="bg-white border border-gray-200 shadow-md">
      <SelectItem value="Bank Of Maharashtra" className="focus:bg-emerald-600 focus:text-white">
        Bank Of Maharashtra
      </SelectItem>
      <SelectItem value="Bank Of India" className="focus:bg-emerald-600 focus:text-white">
        Bank Of India
      </SelectItem>
      <SelectItem value="SBI" className="focus:bg-emerald-600 focus:text-white">
        State Bank of India
      </SelectItem>
      <SelectItem value="Kotak Mahindra Bank" className="focus:bg-emerald-600 focus:text-white">
        Kotak Mahindra Bank
      </SelectItem>
    </SelectContent>
  </Select>

  {errors.bankName && (
    <p className="text-red-500 text-xs mt-1">
      {errors.bankName}
    </p>
  )}
</div>

          
          <div>
            <label className="text-sm text-[#0f172a] opacity-70">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-300 focus:border-emerald-500 outline-none py-2 text-[#0f172a]"
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.accountNumber}
              </p>
            )}
          </div>

         
          <div className="pt-4">
            <button
              
              onClick={handleSubmit}
              disabled={loading}
              className={`text-white px-6 py-2 rounded-md font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
export default AddBank