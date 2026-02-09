"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Users, 
  ShoppingBag, 
  Bell, 
  User,
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Orders", href: "/dashboard/orders", icon: ClipboardList },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Inventory", href: "/dashboard/inventory", icon: ShoppingBag },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
      {/* Container: محدد بـ max-w لضمان عدم تمدد العناصر بشكل مبالغ فيه */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* اليمين: اللوجو والروابط */}
          <div className="flex items-center gap-10">
            <Link href="/dashboard" className="flex items-center gap-2.5 group transition-all">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                <Package size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Shop<span className="text-blue-600">Admin</span>
              </span>
            </Link>

            {/* روابط الديسكتوب: مخفية على الموبايل */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-blue-50 text-blue-700" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <link.icon size={17} className={cn(isActive ? "text-blue-600" : "text-slate-400")} />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* اليسار: أدوات المستخدم */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative group">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:animate-pulse"></span>
            </button>
            
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

            <button className="flex items-center gap-2 p-1 pr-3 hover:bg-slate-50 rounded-full transition-all border border-transparent hover:border-slate-200">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                JD
              </div>
              <div className="hidden sm:flex flex-col items-start text-[11px]">
                <span className="font-bold text-slate-700 leading-none">John Doe</span>
                <span className="text-slate-400">Admin</span>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
            </button>

            {/* زر الموبايل */}
            <button 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الموبايل بستايل Slide-down */}
      <div className={cn(
        "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-slate-200",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                pathname === link.href 
                  ? "bg-blue-50 text-blue-600 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <link.icon size={20} />
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}