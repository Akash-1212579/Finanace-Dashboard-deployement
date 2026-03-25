import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.auth,
  );
  console.log("from login", error, loading, isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Enter all credentials before Login!");
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
  <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">

    {/* Header */}
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400">
        Secure Login
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Access your finance dashboard
      </p>
    </div>

    {/* Form */}
    <div className="mt-8 space-y-5">

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@test.com"
          className="w-full rounded-lg bg-slate-950 border border-slate-700 
                     px-4 py-2.5 text-slate-200 text-sm
                     focus:outline-none focus:ring-2 focus:ring-emerald-500
                     transition-all duration-200"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Password
        </label>

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg bg-slate-950 border border-slate-700 
                       px-4 py-2.5 pr-12 text-slate-200 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-500
                       transition-all duration-200"
          />

          {/* Eye Button */}
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center 
                       text-slate-400 hover:text-emerald-400
                       transition-colors duration-200"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        onClick={handleLogin}
        disabled={loading}
        className={`w-full rounded-lg py-2.5 text-sm font-semibold
          transition-all duration-300
          ${
            loading
              ? "bg-emerald-900 text-emerald-300 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600 text-slate-900"
          }`}
      >
        {loading ? "Authenticating..." : "Login"}
      </button>

      {/* Register Link */}
      <div className="text-center">
        <Link
          to="/register"
          className="text-sm text-slate-400 hover:text-emerald-400 
                     transition-colors duration-200"
        >
          Don't have an account? Register
        </Link>
      </div>

      {/* Status Messages */}
      {error && (
        <p className="text-sm text-red-400 text-center">{error}</p>
      )}

      {isAuthenticated && (
        <p className="text-sm text-emerald-400 text-center">
          Logged in successfully
        </p>
      )}
    </div>
  </div>
</div>
  );
}
