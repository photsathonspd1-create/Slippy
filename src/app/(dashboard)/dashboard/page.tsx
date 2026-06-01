"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar as CalendarIcon, 
  Wallet,
  Receipt,
  Sparkles,
  FileText,
  X
} from 'lucide-react'
import FinanceSummaryCard from '@/components/dashboard/FinanceSummaryCard'
import StatCard from '@/components/dashboard/StatCard'
import ExpenseCalendar from '@/components/dashboard/ExpenseCalendar'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function DashboardPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-12 max-w-7xl mx-auto"
    >
      {/* LINE Banner */}
      <motion.div variants={item} className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="bg-[#06C755] text-white p-2.5 rounded-full flex items-center justify-center">
              {/* LINE Icon representation */}
              <MessageSquareLineIcon />
            </div>
            <div>
               <p className="font-bold text-slate-800 text-sm">เพิ่ม @bainy เป็นเพื่อนใน LINE</p>
               <p className="text-xs text-slate-500 mt-0.5">
                 สแกนใบเสร็จจากมือถือได้ทันที · หากมีปัญหาการใช้งานติดต่อทีมงาน <a href="https://line.me/R/ti/p/@175lqsnm" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-800">@175lqsnm</a>
               </p>
            </div>
         </div>
         <div className="flex items-center gap-3">
           <a href="https://line.me/R/ti/p/@bainy" target="_blank" rel="noopener noreferrer" className="bg-[#06C755] text-white px-5 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-[#05b34c] transition-colors">
             เพิ่มเพื่อน
           </a>
           <button className="text-slate-400 hover:text-slate-600"><X size={16}/></button>
         </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-[2rem] font-heading font-black text-slate-800 tracking-tight">ภาพรวมการเงิน</h1>
            <p className="text-slate-600 text-sm">ยินดีต้อนรับ, <span className="text-primary font-bold">Peach</span></p>
          </div>

          <motion.div variants={item} className="h-64">
            <FinanceSummaryCard />
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div variants={item}>
              <StatCard 
                label="ยอดใช้จ่ายวันนี้"
                value="฿0.00"
                subValue="0 รายการวันนี้"
                icon={Wallet}
                colorClass="bg-orange-100 text-orange-500"
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard 
                label="ยอดใช้จ่ายปีนี้"
                value="฿0.00"
                subValue="0 รายการในปีนี้"
                icon={CalendarIcon}
                colorClass="bg-emerald-100 text-emerald-500"
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard 
                label="งบประมาณคงเหลือ"
                value="ไม่ได้ตั้งงบ"
                subValue="ตั้งเป้าหมายงบประมาณ"
                icon={Wallet}
                colorClass="bg-orange-100 text-orange-500"
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard 
                label="ใบเสร็จเดือนนี้"
                value="0 รายการ"
                subValue="รวม 0 รายการ"
                icon={FileText}
                colorClass="bg-blue-100 text-blue-500"
              />
            </motion.div>
          </div>
        </div>

        {/* Right Column (Widgets) */}
        <div className="space-y-6 lg:pt-[4.5rem]">
          {/* Mascot positioning wrapper */}
          <div className="relative">
            {/* Mascot */}
            <div className="absolute -top-16 right-4 z-10 w-32 h-24">
              <img src="https://bainy.unyhub.org/element/mascot-5.webp" alt="Mascot" className="w-full h-full object-contain" />
            </div>
            
            {/* AI Analysis Widget */}
            <motion.div variants={item} className="bg-[#FEF9C3] rounded-2xl shadow-sm relative overflow-hidden mt-6">
              {/* Top decorative banner */}
              <div className="h-16 bg-[#eab308] w-full relative overflow-hidden">
                 <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                 <div className="absolute -right-4 top-2 opacity-50 text-6xl text-yellow-300 font-bold">$</div>
                 <div className="absolute right-12 top-4 opacity-50 text-4xl text-yellow-300 font-bold">$</div>
              </div>
              <div className="p-6 relative z-20">
                <h4 className="text-slate-800 font-heading font-black mb-4 flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 text-blue-600 rounded-full">
                    <Sparkles size={16} />
                  </div>
                  Bainy วิเคราะห์การเงิน
                </h4>
                <div className="bg-white p-4 rounded-xl border border-yellow-200/50 flex items-start gap-3 shadow-sm">
                  <Sparkles size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    เพิ่มข้อมูลรายจ่ายเพื่อรับการวิเคราะห์อัตโนมัติ
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={item}>
            <ExpenseCalendar />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function MessageSquareLineIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 10.304C24 4.614 18.618 0 12 0C5.382 0 0 4.614 0 10.304C0 15.421 4.545 19.697 10.297 20.468C10.697 20.548 11.238 20.781 11.411 21.144C11.564 21.464 11.517 22.052 11.455 22.457C11.455 22.457 11.171 24.167 11.111 24.512C11.061 24.808 10.835 25.842 12.012 25.321C13.189 24.799 18.368 21.737 21.127 18.238C23.031 15.823 24 13.176 24 10.304Z" fill="currentColor"/>
    </svg>
  )
}


