import { Wallet,Menu, X,
  LayoutDashboard,
  Receipt,
  BarChart3,
  Upload,
  Settings,
  LogOut ,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Transactions", icon: Receipt, path: "/transactions" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Import/Export", icon: Upload, path: "/vault" },
  { label: "Profile", icon: Settings, path: "/profile" },
];

const Sidebar = ({isOpen ,userName}) => {
      //console.log("sidebar re-rendered");
      // const userData = localStorage.getItem("user");
      // console.log("user Data is ", userData);
      // const userName = userData.name;
      const dispatch = useDispatch();
      const handleLogout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(logout());
      }
  return (
    <>
    <aside className={` ${isOpen?"hidden":"block"} md:block
    w-[75vw] md:w-85 h-screen 
  sticky
  top-0
 

    
bg-gradient-to-b
from-[#0B1220]
via-[#141D33]
via-[#2C3752]
to-[#55637A]
backdrop-blur-xl
bg-white/5
border-r border-white/10
shadow-2xl
flex flex-col
`}>
      
     

      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-400 font-bold"><Wallet /></span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white/60 leading-tight">FinTrack</h2>
            <p className="text-xs text-white/60">ProCore</p>
          </div>
        </div>
      </div>

      {/*  Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-200
              ${
                isActive
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }
              `
            }
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/*  Monthly summary */}
      {/* <div className="px-4 pb-4">
        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-xs text-white/60">This Month</p>
          <p className="text-lg font-semibold text-emerald-400">
            +₹7,926.05
          </p>

          <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-1 w-2/3 bg-emerald-500 rounded-full" />
          </div>
        </div>
      </div> */}

      {/*  User */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex mt-0 md:mt-auto lg:mt-[66%] items-end items-center gap-3">
          <div
          className="
            h-10
            w-10
            rounded-full
            bg-[#00BC7D]
            flex
            items-center
            justify-center
            text-sm
            font-semibold
            text-slate-100
            cursor-pointer
            select-none
          "
        >
          {userName?.[0] ?? "U"}
        </div>
          {/* <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-500 flex items-center justify-center font-semibold">
            JD
          </div> */}
          <div className="flex-1">
            <p className="text-sm text-emerald-500 font-medium">{userName ? userName : "Guest"}</p>
            <p className="text-xs text-white/60">Premium Plan</p>
          </div>
              <Button
      variant="ghost"
      size="icon"
      aria-label="Logout"
       className="text-muted-foreground hover:text-emerald-600 hover:bg-emerald-300"
      onClick={handleLogout}
    >
      <LogOut className="h-5 w-5" />
    </Button>

        </div>
      </div>
    </aside>
    
    </>

  );
};

export default Sidebar;
