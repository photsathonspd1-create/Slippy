"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Calendar, 
  Filter, 
  Plus, 
  Receipt, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Download
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import AddTransactionModal from '@/components/transactions/AddTransactionModal'
import { useTransactions } from '@/hooks/useTransactions'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 }
}

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState('EXPENSE')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { transactions = [], isLoading, mutate } = useTransactions("cm01demoorgid000000000000", undefined, undefined, activeTab)

  const displayTransactions = Array.isArray(transactions) ? transactions : []

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); mutate(); }} 
      />

      {/* Header Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-amber-500 text-slate-900 border-none">
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">ยอดรวม {activeTab === 'EXPENSE' ? 'รายจ่าย' : 'รายรับ'}</p>
            <h3 className="text-3xl font-heading font-bold mt-1">฿45,290.00</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">จำนวนใบเสร็จ</p>
            <h3 className="text-3xl font-heading font-bold text-slate-800 mt-1">24 ราย</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-red-500">
            <p className="text-xs font-medium opacity-70 uppercase tracking-wider">ยอดค้างจ่าย (Pending)</p>
            <h3 className="text-3xl font-heading font-bold mt-1">฿1,200.00</h3>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Card */}
      <Card className="min-h-[600px]">
        <div className="border-b border-slate-100">
          <div className="flex px-6">
            {['EXPENSE', 'INCOME', 'VOUCHER'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-4 text-sm font-bold transition-all relative",
                  activeTab === tab ? "text-amber-500" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {tab === 'EXPENSE' ? 'รายจ่าย' : tab === 'INCOME' ? 'รายรับ' : 'ใบสำคัญ'}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-t-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="ค้นหาร้านค้า หรือ รายละเอียด..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Calendar size={18} />
            พฤษภาคม 2569
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
            ตัวกรอง
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Download size={18} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">วันที่จ่าย</th>
                <th className="px-6 py-4">ร้านค้า / แหล่งที่มา</th>
                <th className="px-6 py-4">รายละเอียด</th>
                <th className="px-6 py-4">หมวดหมู่</th>
                <th className="px-6 py-4">สถานะ</th>
                <th className="px-6 py-4 text-right">ยอดเงิน</th>
                <th className="px-6 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr><td colSpan={7} className="text-center py-8 text-slate-400">กำลังโหลดข้อมูล...</td></tr>
              ) : displayTransactions.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8 text-slate-400">ยังไม่มีรายการ</td></tr>
              ) : displayTransactions.map((tx: any) => (
                <motion.tr 
                  key={tx.id}
                  variants={item}
                  className="group hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-500">{new Date(tx.txDate).toLocaleDateString('th-TH')}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{tx.vendor}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-lg",
                      tx.status === 'CONFIRMED' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                    )}>
                      {tx.status === 'CONFIRMED' ? 'ยืนยันแล้ว' : 'รอดำเนินการ'}
                    </span>
                  </td>
                  <td className={cn(
                    "px-6 py-4 text-right font-bold font-heading",
                    tx.type === 'INCOME' ? "text-emerald-500" : "text-slate-800"
                  )}>
                    {tx.type === 'INCOME' ? '+' : ''}฿{Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 text-slate-300 hover:text-slate-600 rounded transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* FAB for Mobile/Quick add */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-amber-500 text-slate-900 rounded-full shadow-xl shadow-amber-500/40 flex items-center justify-center hover:bg-amber-400 hover:scale-110 transition-all active:scale-95 z-50"
      >
        <Plus size={28} />
      </button>
    </motion.div>
  )
}
