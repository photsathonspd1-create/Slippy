"use client"

import React, { useState } from 'react'
import Modal from '../ui/Modal'
import { cn } from '@/lib/utils'
import { CheckCircle2 } from 'lucide-react'

interface BankAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

const banks = [
  { id: 'PROMPTPAY', name: 'พร้อมเพย์', color: 'bg-blue-600' },
  { id: 'TRUEMONEY', name: 'TrueMoney', color: 'bg-orange-500' },
  { id: 'SCB', name: 'SCB', color: 'bg-purple-700' },
  { id: 'KBANK', name: 'กสิกรไทย', color: 'bg-emerald-600' },
  { id: 'BBL', name: 'กรุงเทพ', color: 'bg-blue-800' },
  { id: 'KTB', name: 'กรุงไทย', color: 'bg-light-blue-400' },
  { id: 'TTB', name: 'TTB', color: 'bg-blue-900' },
  { id: 'CIMB', name: 'CIMB', color: 'bg-red-700' },
  { id: 'UOB', name: 'UOB', color: 'bg-blue-950' },
  { id: 'GSB', name: 'ออมสิน', color: 'bg-pink-500' },
  { id: 'BAY', name: 'กรุงศรี', color: 'bg-yellow-500' },
  { id: 'OTHER', name: 'อื่นๆ', color: 'bg-slate-400' },
]

export default function BankAccountModal({ isOpen, onClose }: BankAccountModalProps) {
  const [selectedBank, setSelectedBank] = useState('')
  const [isMain, setIsMain] = useState(false)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="เพิ่มบัญชีธนาคาร" className="max-w-2xl">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 ml-1">เลือกธนาคาร / ช่องทางชำระเงิน</label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {banks.map((bank) => (
              <button
                key={bank.id}
                type="button"
                onClick={() => setSelectedBank(bank.id)}
                className={cn(
                  "p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 relative",
                  selectedBank === bank.id 
                    ? "border-amber-500 bg-amber-50 scale-105" 
                    : "border-slate-100 bg-slate-50 hover:border-slate-200"
                )}
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-bold", bank.color)}>
                  {bank.id}
                </div>
                <span className="text-[10px] font-bold text-slate-600">{bank.name}</span>
                {selectedBank === bank.id && (
                  <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-0.5">
                    <CheckCircle2 size={12} fill="currentColor" className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 ml-1">ชื่อบัญชี / ชื่อพร้อมเพย์</label>
            <input type="text" placeholder="ระบุชื่อ..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 outline-none transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 ml-1">เลขที่บัญชี / เบอร์โทรพร้อมเพย์</label>
            <input type="text" placeholder="ระบุเลขที่..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 outline-none transition-all" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 ml-1">หมายเหตุ (ไม่บังคับ)</label>
          <input type="text" placeholder="เช่น บัญชีเงินเดือน, บัญชีกลาง..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 outline-none transition-all" />
        </div>

        <div className="flex items-center gap-2 py-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={isMain} 
              onChange={(e) => setIsMain(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500" 
            />
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">ตั้งเป็นบัญชีหลัก</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 text-sm font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="flex-[2] py-3 text-sm font-bold text-slate-900 bg-amber-500 hover:bg-amber-400 rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            บันทึกบัญชี
          </button>
        </div>
      </form>
    </Modal>
  )
}
