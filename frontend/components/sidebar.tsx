"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingDown,
  TrendingUp,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X,
  Target,
  PieChart,
  Lightbulb,
  HeartPulse,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggle sidebar visibility on mobile
   */
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    router.push("/login");
  };

  // Navigation items configuration
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Expenses",
      href: "/dashboard/expenses",
      icon: <TrendingDown className="h-5 w-5" />,
    },
    {
      title: "Income",
      href: "/dashboard/income",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "Budgets",
      href: "/dashboard/budgets",
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      title: "Saving Goals",
      href: "/dashboard/saving-goals",
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Financial Health",
      href: "/dashboard/financial-health",
      icon: <HeartPulse className="h-5 w-5" />,
    },
    {
      title: "Insights",
      href: "/dashboard/insights",
      icon: <Lightbulb className="h-5 w-5" />,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  // Sidebar CSS classes based on mobile/desktop view
  const sidebarClasses = cn(
    "bg-card text-card-foreground h-full flex flex-col border-r",
    {
      "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out":
        isMobile,
      "translate-x-0": isOpen && isMobile,
      "-translate-x-full": !isOpen && isMobile,
      "w-64": !isMobile,
    }
  );

  return (
    <>
      {/* Mobile menu toggle button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      {/* Sidebar content */}
      <div className={sidebarClasses}>
        {/* App title */}
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <TrendingUp className="h-4 w-7 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold">MyFinanceMate</h2>
          </div>
        </div>

        {/* Navigation menu */}
        <div className="flex-1 px-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent"
                  )}
                >
                  {item.icon}
                  {item.title}
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout button */}
        <div className="p-4 mt-auto border-t">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
