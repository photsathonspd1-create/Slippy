"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Bell, HelpCircle, ChevronRight, Calendar, Sidebar as SidebarIcon, CheckCircle2, FileText, Settings, LogOut, ChevronLeft, MessageSquare } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { cn } from '@/lib/utils'

import Link from 'next/link'

export default function TopBar() {
  const { toggleMobileSidebar } = useAppStore()
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => prev === name ? null : name)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      {/* Breadcrumb / Page Title */}
      <div className="flex items-center gap-3 md:gap-4 text-sm font-medium min-w-0">
        <button 
          onClick={toggleMobileSidebar}
          className="text-slate-500 hover:text-slate-800 flex-shrink-0 lg:hidden"
        >
          <SidebarIcon size={18} />
        </button>
        <div className="w-[1px] h-4 bg-slate-200 hidden md:block"></div>
        <Link href="/dashboard" className="text-primary hover:underline cursor-pointer hidden md:inline">Dashboard</Link>
        <ChevronRight size={14} className="text-slate-400 hidden md:block flex-shrink-0" />
        <span className="text-slate-800 font-bold truncate">ภาพรวมการเงิน</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0" ref={dropdownRef}>
        
        {/* Date Picker */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('calendar')}
            className={cn(
              "flex items-center gap-2 px-2 md:px-3 py-2 rounded-xl border text-xs font-bold transition-colors",
              openDropdown === 'calendar' 
                ? "bg-primary-light border-primary text-primary" 
                : "border-slate-200 text-primary hover:bg-slate-50"
            )}
          >
            <Calendar size={14} />
            <span className="hidden sm:inline">พฤษภาคม 2026</span>
            <ChevronRight size={14} className={cn("text-slate-400 transition-transform", openDropdown === 'calendar' ? "-rotate-90" : "rotate-90")} />
          </button>
          
          {openDropdown === 'calendar' && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center mb-4">
                <button className="p-1 hover:bg-slate-100 rounded-lg"><ChevronLeft size={16}/></button>
                <span className="text-sm font-bold text-slate-800">พฤษภาคม 2026</span>
                <button className="p-1 hover:bg-slate-100 rounded-lg"><ChevronRight size={16}/></button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'].map((month, idx) => (
                  <button 
                    key={month}
                    className={cn(
                      "py-2 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors",
                      idx === 4 ? "bg-primary text-white hover:bg-primary/90" : "text-slate-600"
                    )}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('help')}
            className={cn(
              "p-2 rounded-full transition-all border",
              openDropdown === 'help'
                ? "bg-primary-light border-primary text-primary"
                : "text-slate-400 hover:text-primary hover:bg-primary-light border-slate-200"
            )}
          >
            <HelpCircle size={18} />
          </button>
          
          {openDropdown === 'help' && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">ช่วยเหลือ</div>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                <FileText size={16} className="text-slate-400" />
                คู่มือการใช้งาน
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                <MessageSquare size={16} className="text-slate-400" />
                แชทกับทีมซัพพอร์ต
              </a>
              <div className="h-[1px] bg-slate-100 my-1 mx-2"></div>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                <Settings size={16} className="text-slate-400" />
                ตั้งค่าระบบ
              </a>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('bell')}
            className={cn(
              "p-2 rounded-full transition-all relative border",
              openDropdown === 'bell'
                ? "bg-primary-light border-primary text-primary"
                : "text-slate-400 hover:text-primary hover:bg-primary-light border-slate-200"
            )}
          >
            <Bell size={18} />
          </button>
          
          {openDropdown === 'bell' && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-heading font-bold text-slate-800">การแจ้งเตือน</h4>
                <button className="text-xs text-primary font-medium hover:underline">อ่านทั้งหมด</button>
              </div>
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">ไม่มีการแจ้งเตือนใหม่</p>
                  <p className="text-xs text-slate-500 mt-1">คุณตรวจสอบทุกอย่างครบแล้ว</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}



