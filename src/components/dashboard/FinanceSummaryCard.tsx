"use client"

import React from 'react'
import { Wallet } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'

export default function FinanceSummaryCard() {
  return (
    <Card className="bg-gradient-to-b from-[#E6EFFF] to-[#EFF5FF] border-none shadow-sm relative overflow-hidden h-full">
      <CardContent className="p-8 flex flex-col justify-between h-full">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm bg-white w-fit px-4 py-2 rounded-full shadow-sm">
            <Wallet size={16} />
            ใช้จ่ายประจำเดือน พฤษภาคม
          </div>
          <h2 className="text-[2.75rem] font-heading font-black text-[#1e3a8a] tracking-tight mt-6 leading-none">
            ฿ 0.00
          </h2>
        </div>

        <div className="mt-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-2 border border-white">
            <span className="text-slate-600 text-sm font-medium">สถานะการใช้จ่าย :</span>
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-slate-400"></div>
              <span className="text-slate-700 text-xs font-bold">ไม่ได้ตั้งงบ</span>
            </div>
            <div className="flex-1 ml-2 bg-slate-200/50 h-2.5 rounded-full overflow-hidden">
               {/* Empty progress bar */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


