'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Package, Truck, Settings, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "~/lib/utils";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarExpanded");
    setIsExpanded(savedState ? JSON.parse(savedState) as boolean : true);
  }, []);

  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    localStorage.setItem("sidebarExpanded", JSON.stringify(newState));
  };

  const navigationItems = [
    {
      href: "#",
      icon: isExpanded ? PanelLeftClose : PanelLeftOpen,
      label: "",
      onClick: toggleSidebar,
      className: "hover:text-custom-wine-400"
    },
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/entregas", icon: Truck, label: "Entregas" },
    { href: "/dashboard/pedidos", icon: Package, label: "Pedidos" },
    { href: "/dashboard/config", icon: Settings, label: "Configurações" },
  ];

  return (
    <aside
      className={cn(
        "bg-gray-800 h-screen transition-all duration-500 ease-in-out flex flex-col",
        isExpanded ? "w-72" : "w-20"
      )}
    >
      <nav className="p-6">
        <ul className="space-y-6">
          {navigationItems.map((item) => (
            <li key={item.href}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center space-x-4 text-gray-300 hover:text-custom-wine-400 transition-colors w-full",
                    item.className
                  )}
                >
                  <item.icon className="w-7 h-7 transition-transform duration-500" />
                  <span 
                    className={cn(
                      "text-lg font-medium transition-opacity duration-500 absolute left-20",
                      isExpanded ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-4 text-gray-300 hover:text-custom-wine-400 transition-colors relative",
                    pathname === item.href && "text-custom-wine-400"
                  )}
                >
                  <item.icon className="w-7 h-7" />
                  <span 
                    className={cn(
                      "text-lg font-medium transition-opacity duration-500 absolute left-14",
                      isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}