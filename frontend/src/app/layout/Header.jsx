import { Bell, Menu, X } from "lucide-react";

const Header = ({ userName, bankName, isOpen, onToggleSidebar }) => {
      console.log("header re-rendered");

  return (
    <header
      className="
        h-16
        w-full
        bg-background
        border-b
        border-border
        px-2
        flex
        items-center
        justify-between md:justify-end 
        sticky top-0
      "
    >
      <button
        className="md:hidden p-1 rounded-md  hover:bg-emerald-400"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <Menu className="text-red w-6 h-6" />
          ) : (
          <X className="text-red w-6 h-6" strokeWidth={2.25} />
        )}
      </button>
    {/* <button className="text-red-600 z-999999">Test</button> */}
   
      <div className="flex items-center gap-6">
        <div className="text-m text-muted-foreground hidden sm:block">
          <span className="font-medium text-foreground">
            {userName}
          </span>
          {" · "}
          {bankName}
        </div>

        <button
          className="
            relative
            rounded-full
            p-2
            text-muted-foreground
            hover:text-foreground
            hover:bg-muted
            transition
          "
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>

        <div
          className="
            h-9
            w-9
            rounded-full
            bg-emerald-500/15
            flex
            items-center
            justify-center
            text-sm
            font-semibold
            text-emerald-600
            cursor-pointer
            select-none
          "
        >
          {userName?.[0] ?? "U"}
          
        </div>
      </div>
    </header>
  );
};

export default Header;
