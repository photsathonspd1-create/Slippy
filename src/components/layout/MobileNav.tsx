"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  History, 
  Upload, 
  LayoutGrid, 
  Menu 
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { label: "ภาพรวม", href: "/dashboard", icon: LayoutDashboard },
    { label: "รายการ", href: "/transactions", icon: History },
    { isCenter: true },
    { label: "หมวดหมู่", href: "/reports", icon: LayoutGrid },
    { label: "อื่นๆ", href: "/organization", icon: Menu },
  ]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 transform-gpu">
      {/* Extension for iOS bottom safe area */}
      <div className="absolute inset-x-0 bottom-[-100px] h-[100px] bg-[#001633] border-t border-white/5"></div>
      
      <nav className="bg-[#001633] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] relative pb-1">
        <div className="grid grid-cols-5 h-[68px] relative items-stretch">
          {navItems.map((item, idx) => {
            if (item.isCenter) {
              return (
                <div key="center" className="relative flex justify-center items-center">
                  <button type="button" className="absolute -top-6 flex flex-col items-center justify-center transition-all duration-300 outline-none hover:scale-105 active:scale-95">
                    <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center border-4 border-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.2)] relative z-10 bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-200">
                      <Upload className="h-8 w-8 text-white stroke-[2.5px] drop-shadow-md" />
                    </div>
                  </button>
                </div>
              )
            }

            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href!))

            return (
              <Link
                key={item.label}
                href={item.href!}
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90 relative",
                  isActive ? "text-[#FFCB2F]" : "text-slate-400"
                )}
              >
                {isActive && (
                  <div className="absolute top-0 w-8 h-0.5 bg-[#FFCB2F] rounded-b-full shadow-[0_4px_10px_rgba(255,203,47,0.4)]"></div>
                )}
                {Icon && (
                  <Icon 
                    className={cn(
                      "h-6 w-6 transition-all duration-300",
                      isActive ? "stroke-[2.5px] scale-110" : "stroke-2"
                    )} 
                  />
                )}
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-wider",
                  isActive ? "text-[#FFCB2F]" : "text-slate-400/70"
                )}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
        <div className="pb-safe bg-[#001633] w-full"></div>
      </nav>
    </div>
  )
}

