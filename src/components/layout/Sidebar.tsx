"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  BarChart2, 
  Settings, 
  ChevronDown, 
  ChevronUp,
  Lock, 
  Zap,
  Wallet, 
  MessageSquare,
  LogOut,
  User as UserIcon,
  ChevronsUpDown,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

const navItems = [
  { label: "ภาพรวมการเงิน", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "จัดการเอกสาร",
    icon: FileText,
    children: [
      { label: "รายรับ-รายจ่าย", href: "/transactions" },
      { label: "งานและเอกสารสาย", href: "/documents", locked: true },
      { label: "แปลงรูปเป็น PDF", href: "/scan" },
    ],
  },
  {
    label: "รายงาน & งบประมาณ",
    icon: BarChart2,
    children: [
      { label: "หมวดหมู่ และ งบประมาณ", href: "/reports" },
      { label: "ส่งออกข้อมูล (Export)", href: "/export", locked: true },
    ],
  },
  {
    label: "ตั้งค่าระบบ",
    icon: Settings,
    children: [
      { label: "จัดการองค์กร", href: "/organization" },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { isMobileSidebarOpen, closeMobileSidebar } = useAppStore()
  const [openMenus, setOpenMenus] = useState<string[]>(["จัดการเอกสาร", "รายงาน & งบประมาณ", "ตั้งค่าระบบ"])

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => 
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    )
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}
      <aside className={cn(
        "w-[260px] bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 z-[70] transition-transform duration-300",
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={closeMobileSidebar} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full">
            <X size={16} />
          </button>
        </div>
        {/* Logo & Company Switcher */}
        <div className="p-4 pt-0 lg:pt-4">
          <Link href="/dashboard" className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
                S
              </div>
              <div className="flex flex-col items-start truncate">
                <span className="text-sm font-bold text-slate-900 truncate">Test Company</span>
                <span className="text-[10px] text-slate-500 font-medium">Slippy FREE</span>
              </div>
            </div>
            <ChevronsUpDown size={14} className="text-slate-400" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.children && item.children.some(c => pathname === c.href));
            
            return (
              <div key={item.label} className="space-y-1">
                {item.children ? (
                  <>
                    <button 
                      onClick={() => toggleMenu(item.label)}
                      className={cn(
                        "w-full flex items-center justify-between p-2.5 rounded-xl transition-all group",
                        isActive && !openMenus.includes(item.label) ? "bg-primary-light text-primary font-bold" : "text-slate-700 hover:bg-slate-100 font-medium"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className={isActive ? "text-primary" : "text-slate-500"} />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {openMenus.includes(item.label) ? (
                        <ChevronUp size={16} className="text-slate-400" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-400" />
                      )}
                    </button>
                    {openMenus.includes(item.label) && (
                      <div className="pl-9 pr-2 space-y-1 mt-1">
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              onClick={() => closeMobileSidebar()}
                              key={child.label}
                              href={child.locked ? "#" : child.href}
                              className={cn(
                                "flex items-center justify-between p-2 rounded-lg text-sm transition-all",
                                isChildActive 
                                  ? "text-primary font-bold bg-primary-light/50" 
                                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                                child.locked && "opacity-50 cursor-not-allowed"
                              )}
                            >
                              <span>{child.label}</span>
                              {child.locked && <Lock size={12} className="text-slate-400" />}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    onClick={() => closeMobileSidebar()}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 p-2.5 rounded-xl transition-all",
                      isActive 
                        ? "bg-primary-light text-primary font-bold" 
                        : "text-slate-700 hover:bg-slate-100 font-medium"
                    )}
                  >
                    <item.icon size={18} className={isActive ? "text-primary" : "text-slate-500"} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 space-y-2 mt-auto">
          <Link href="/pricing" onClick={() => closeMobileSidebar()} className="flex items-center gap-3 p-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-all group">
            <Zap size={18} className="text-amber-500 fill-amber-500" />
            <span className="font-semibold">อัปเกรดสมาชิก</span>
          </Link>
          <Link href="#" onClick={() => closeMobileSidebar()} className="flex items-center gap-3 p-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-all">
            <Wallet size={18} className="text-slate-700" />
            <span className="font-medium">กระเป๋าเครดิต & รอบบิล</span>
          </Link>
          <a href="https://line.me/R/ti/p/@bainy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-all">
            <div className="w-5 h-5 bg-[#06C755] rounded-full flex items-center justify-center">
              <MessageSquare size={12} className="text-white fill-white" />
            </div>
            <span className="font-medium">แชทกับ Slippy ใน LINE</span>
          </a>

          {/* User Profile */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
                  <UserIcon size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-900 truncate">Peach</span>
                  <span className="text-[10px] text-slate-500 truncate">demo@slippy.app</span>
                </div>
              </div>
              <ChevronsUpDown size={14} className="text-slate-400 flex-shrink-0" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

