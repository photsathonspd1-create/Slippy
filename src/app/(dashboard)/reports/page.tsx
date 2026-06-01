"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Lock,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
}

const categoryData = [
  { name: 'อาหาร/เครื่องดื่ม', value: 12500, color: '#F59E0B' },
  { name: 'ขนส่ง', value: 4800, color: '#3B82F6' },
  { name: 'สำนักงาน', value: 3200, color: '#10B981' },
  { name: 'สาธารณูปโภค', value: 2400, color: '#6366F1' },
  { name: 'อื่นๆ', value: 1500, color: '#94A3B8' },
]

export default function ReportsPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <h3 className="text-lg font-heading font-bold text-slate-800">สรุปตามหมวดหมู่</h3>
              <p className="text-xs text-slate-400">ประจำเดือนพฤษภาคม 2569</p>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Budget vs Actual */}
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-800">งบประมาณรายหมวด</h3>
                <p className="text-xs text-slate-400">เปรียบเทียบงบประมาณที่ตั้งไว้</p>
              </div>
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  <span className="text-slate-500">งบประมาณ</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span className="text-slate-500">ใช้ไปจริง</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {categoryData.slice(0, 4).map((cat, idx) => {
                const budget = cat.value + (Math.random() * 5000 - 2500)
                const percent = Math.min(100, (cat.value / budget) * 100)
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-slate-700">{cat.name}</span>
                      <span className="text-slate-500">
                        <span className="font-bold text-slate-800">฿{cat.value.toLocaleString()}</span> / ฿{Math.round(budget).toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={cn(
                          "h-full rounded-full transition-all",
                          percent > 90 ? "bg-red-500" : "bg-amber-500"
                        )}
                      />
                    </div>
                  </div>
                )
              })}
              
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0" size={18} />
                <p className="text-[10px] text-red-800 leading-relaxed font-medium">
                  หมวด "อาหาร/เครื่องดื่ม" มีแนวโน้มที่จะเกินงบประมาณที่ตั้งไว้ในสัปดาห์หน้า
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Export Section */}
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-heading font-bold text-slate-800">ส่งออกข้อมูล (Export)</h3>
            <p className="text-xs text-slate-400">ดาวน์โหลดรายงานเพื่อนำไปใช้งานต่อในระบบอื่น</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'สรุปภาษีซื้อ', desc: 'ไฟล์ CSV สำหรับทำรายงานภาษีประจำเดือน', icon: FileSpreadsheet, locked: true },
                { title: 'รายงานหัก ณ ที่จ่าย', desc: 'สรุปรายการ WHT ทั้งหมดในเดือนนี้', icon: FileText, locked: true },
                { title: 'ใบสำคัญจ่ายทั้งหมด', desc: 'ดาวน์โหลด PDF ใบสำคัญจ่ายแบบรวมไฟล์', icon: Download, locked: false },
              ].map((report, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "p-6 rounded-3xl border transition-all relative group overflow-hidden",
                    report.locked 
                      ? "bg-slate-50 border-slate-100 opacity-80" 
                      : "bg-white border-slate-200 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/5"
                  )}
                >
                  {report.locked && (
                    <div className="absolute top-4 right-4 text-slate-400">
                      <Lock size={16} />
                    </div>
                  )}
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                    report.locked ? "bg-slate-200 text-slate-400" : "bg-amber-500/10 text-amber-500"
                  )}>
                    <report.icon size={24} />
                  </div>
                  <h4 className="font-heading font-bold text-slate-800 mb-1">{report.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">{report.desc}</p>
                  
                  {report.locked ? (
                    <button className="flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase tracking-widest hover:underline">
                      อัปเกรดเพื่อใช้งาน <ArrowRight size={12} />
                    </button>
                  ) : (
                    <button className="flex items-center gap-2 text-[10px] font-bold text-slate-800 uppercase tracking-widest group-hover:text-amber-600">
                      ดาวน์โหลดข้อมูล <Download size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
