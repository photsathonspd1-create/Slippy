"use client"

import React, { useState } from 'react'
import Modal from '../ui/Modal'
import { Calendar, Tag, Image as ImageIcon, Receipt, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
}

const categories = [
  "อาหาร/เครื่องดื่ม",
  "ขนส่ง",
  "สำนักงาน",
  "อุปกรณ์/ครุภัณฑ์",
  "การตลาด",
  "บุคลากร",
  "ค่าสาธารณูปโภค",
  "ภาษี",
  "อื่นๆ"
]

export default function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const [type, setType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE')
  const [vat, setVat] = useState(false)
  const [wht, setWht] = useState(false)
  
  const [amount, setAmount] = useState('')
  const [vendor, setVendor] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [txDate, setTxDate] = useState(new Date().toISOString().split('T')[0])
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          amount: parseFloat(amount),
          vendor,
          category,
          description,
          txDate: new Date(txDate).toISOString(),
          vatAmount: vat ? parseFloat(amount) * 0.07 : 0,
          whtAmount: wht ? parseFloat(amount) * 0.03 : 0,
        })
      })

      if (!res.ok) {
        throw new Error('Failed to create transaction')
      }

      onClose()
      // Reset form
      setAmount('')
      setVendor('')
      setDescription('')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="บันทึกรายการใหม่">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Type Toggle */}
        <div className="flex p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setType('EXPENSE')}
            className={cn(
              "flex-1 py-2 text-sm font-bold rounded-xl transition-all",
              type === 'EXPENSE' ? "bg-white text-red-500 shadow-sm" : "text-slate-500"
            )}
          >
            รายจ่าย
          </button>
          <button
            type="button"
            onClick={() => setType('INCOME')}
            className={cn(
              "flex-1 py-2 text-sm font-bold rounded-xl transition-all",
              type === 'INCOME' ? "bg-white text-emerald-500 shadow-sm" : "text-slate-500"
            )}
          >
            รายรับ
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 ml-1">วันที่</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="date" 
                required
                value={txDate}
                onChange={(e) => setTxDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 ml-1">ยอดเงิน (บาท)</label>
            <input 
              type="number" 
              required
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 ml-1">{type === 'EXPENSE' ? 'ร้านค้า / ผู้รับเงิน' : 'แหล่งรายได้ / ผู้จ่ายเงิน'}</label>
          <div className="relative">
            <Receipt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              required
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder="ระบุชื่อ..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 ml-1">หมวดหมู่</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all appearance-none"
            >
              <option value="">เลือกหมวดหมู่...</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* VAT / WHT Toggles */}
        <div className="flex items-center gap-6 py-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={vat} 
              onChange={(e) => setVat(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500" 
            />
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">รวม VAT 7%</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={wht} 
              onChange={(e) => setWht(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500" 
            />
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">หัก ณ ที่จ่าย (WHT)</span>
          </label>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 ml-1">หมายเหตุ</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="รายละเอียดเพิ่มเติม..."
            rows={2}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all resize-none"
          />
        </div>

        {/* File Upload Placeholder */}
        <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-amber-500 hover:border-amber-500 hover:bg-amber-50 transition-all cursor-pointer">
          <ImageIcon size={24} />
          <p className="text-xs font-medium">แนบรูปใบเสร็จ / หลักฐาน</p>
        </div>

        {error && <p className="text-sm text-red-500 text-center font-medium">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 text-sm font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all disabled:opacity-50"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-[2] py-3 text-sm font-bold text-slate-900 bg-amber-500 hover:bg-amber-400 rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            {isLoading ? 'กำลังบันทึก...' : 'บันทึกรายการ'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

