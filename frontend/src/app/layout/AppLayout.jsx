import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import {Menu , X} from "lucide-react";
const AppLayout = () => {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const userName = userData.name.toUpperCase();
 // console.log(userData,userName);
  const[isOpen,setIsOpen] = useState(true);
    console.log("layout re-rendered");
  console.log(isOpen);
  return (
    <div className="flex min-h-screen  ">
      {/* <button className="w-10 h-10 md:hidden p-2 rounded-md hover:bg-white/10" onClick={()=>setIsOpen(!isOpen)}>
        {
          isOpen?<Menu className="text-red w-6 h-6" />:<X className="text-red w-6 h-6"  size={25} strokeWidth={2.25} />
        } 
</button> */}
<div className="flex flex-col justify-between">
      <Sidebar  isOpen={isOpen} userName={userName}/>
</div>
     { <div className=" flex-1 flex flex-col ">
        {/* <header className="h-16 border-b bg-background px-6 flex items-center">
          <h1 className="text-lg font-semibold">Hello John Doe</h1>
        </header> */}
          
            <Header  userName={userName || "Guest"} bankName={"Bank of Maharashtra"}
            isOpen={isOpen} onToggleSidebar={()=>setIsOpen(prev=>!prev)}
            />
           
        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>}
    </div>
  );
};

export default AppLayout;
