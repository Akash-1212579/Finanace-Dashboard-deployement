import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStart } from "../redux/auth/authSlice";
import { registerUserSevice } from "../redux/auth/authService";
import { registerUser } from "../redux/auth/authThunks";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { isAuthenticated, loading, errro } = useSelector(
    (state) => state.auth,
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    accountName: "",
    accountNumber: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handleSubmit");
    console.log("Register payload:", form);
    const isFormInvalid = Object.values(form).some(
      (value) => value.trim() === "",
    );
    if (isFormInvalid) return alert("Enter all credentials!");
    dispatch(registerUser(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-emerald-400">
            Create Account
          </CardTitle>
          <CardDescription className="text-slate-400">
            Secure your finance dashboard access
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label className="text-slate-300">Full Name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="bg-slate-950 border-slate-700 text-slate-200 focus-visible:ring-emerald-500"
              />
            </div>

            {/* Email */}
            <div>
              <Label className="text-slate-300">Email</Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="bg-slate-950 border-slate-700 text-slate-200 focus-visible:ring-emerald-500"
              />
            </div>

            {/* Password */}
            <div >
              <Label className="text-slate-300">Password</Label>
              <div className="flex">
                <Input
                  type={show ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-slate-950 border-slate-700 text-slate-200 focus-visible:ring-emerald-500"
                />
                <button type="button"
                  className="ml-5"
                  onClick={() => setShow((prev) => !prev)}
                >
                  {show ? (
                    <EyeOff className="text-white" size={20} />
                  ) : (
                    <Eye className="text-white" size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Account Name */}
            <div>
              <Label className="text-slate-300">Account Name</Label>
              <Input
                name="accountName"
                value={form.accountName}
                onChange={handleChange}
                placeholder="Savings / Business"
                className="bg-slate-950 border-slate-700 text-slate-200 focus-visible:ring-emerald-500"
              />
            </div>
            <div>
              <Label className="text-slate-300">
                Account Number(Last 4 Numbers)
              </Label>
              <Input
                type="text"
                name="accountNumber"
                value={form.accountNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 4) {
                    setForm({ ...form, accountNumber: value });
                  }
                }}
                maxLength={4}
                placeholder="XXXX"
                className="bg-slate-950 border-slate-700 text-slate-200 
               focus-visible:ring-emerald-500"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-emerald-500 text-slate-900 hover:bg-emerald-600"
            >
              Register
            </Button>
          </form>
        </CardContent>
        <Link
          to="/"
          className="
    relative ml-auto
    text-center px-3 py-2 text-sm font-medium text-slate-200
    transition-all duration-300 ease-out
    hover:text-emerald-400
    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
    after:bg-emerald-400 after:transition-all after:duration-300
    hover:after:w-full
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-emerald-400/60
    rounded-md
  "
        >
          have an account Login...
        </Link>
      </Card>
    </div>
  );
}

export default Register;
