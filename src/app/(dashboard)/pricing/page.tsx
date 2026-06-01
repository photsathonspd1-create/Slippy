"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Building2, Rocket, Crown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const tiers = [
  {
    name: 'Slippy FREE',
    price: '0',
    icon: Zap,
    color: 'slate',
    features: ['1 องค์กร', '1 สมาชิก', 'สแกนใบเสร็จ (ซื้อเครดิต)', 'บันทึกรายการไม่จำกัด', 'สรุปภาพรวมพื้นฐาน'],
    cta: 'เริ่มต้นใช้งานฟรี',
    current: true
  },
  {
    name: 'Slippy HOBBY',
    price: '69',
    icon: Rocket,
    color: 'amber',
    features: ['1 องค์กร', '1 สมาชิก', '50 เครดิต/เดือน', 'ส่งออก CSV/Excel', 'บันทึกรายการไม่จำกัด', 'สรุปภาพรวมรายหมวด'],
    cta: 'เลือกแพ็กเกจนี้',
    popular: true
  },
  {
    name: 'Slippy BUSINESS',
    price: '189',
    icon: Building2,
    color: 'blue',
    features: ['2 องค์กร', '1 สมาชิก', '160 เครดิต/เดือน', 'ส่งออก CSV/Excel', 'Custom Branding', 'รายงานภาษีซื้ออัตโนมัติ'],
    cta: 'เลือกแพ็กเกจนี้'
  },
  {
    name: 'Slippy BIZ PLUS+',
    price: '349',
    icon: Crown,
    color: 'emerald',
    features: ['5 องค์กร', '10 สมาชิก', '300 เครดิต/เดือน', 'ส่งออกรายงานทุกรูปแบบ', 'LINE Group Integration', 'ระบบกระทบยอดธนาคาร'],
    cta: 'เลือกแพ็กเกจนี้'
  }
]

export default function PricingPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12 py-8 max-w-7xl mx-auto"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-heading font-bold text-slate-800">เลือกแพ็กเกจที่เหมาะกับคุณ</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          เริ่มต้นจัดการบัญชีให้เป็นเรื่องง่าย ด้วยแพ็กเกจที่ยืดหยุ่นตามขนาดธุรกิจของคุณ 
          ไม่มีข้อผูกมัด ยกเลิกได้ทุกเมื่อ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-4">
        {tiers.map((tier) => (
          <motion.div 
            key={tier.name}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1 }
            }}
          >
            <Card className={cn(
              "h-full flex flex-col relative overflow-hidden transition-all hover:shadow-2xl",
              tier.popular ? "border-amber-500 ring-4 ring-amber-500/10 scale-105 z-10" : "border-slate-200"
            )}>
              {tier.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-amber-500 text-slate-900 text-[10px] font-bold px-8 py-1 rotate-45 translate-x-6 translate-y-2 shadow-sm">
                    POPULAR
                  </div>
                </div>
              )}
              
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                  tier.color === 'slate' ? "bg-slate-100 text-slate-600" :
                  tier.color === 'amber' ? "bg-amber-100 text-amber-600" :
                  tier.color === 'blue' ? "bg-blue-100 text-blue-600" :
                  "bg-emerald-100 text-emerald-600"
                )}>
                  <tier.icon size={28} />
                </div>
                
                <h3 className="text-lg font-heading font-bold text-slate-800 mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-slate-900">฿{tier.price}</span>
                  <span className="text-slate-400 text-sm">/เดือน</span>
                </div>

                <div className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="mt-1 p-0.5 bg-emerald-500 rounded-full text-white">
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span className="text-sm text-slate-600 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={cn(
                  "w-full py-3 rounded-2xl text-sm font-bold transition-all active:scale-95 mt-auto shadow-lg",
                  tier.current 
                    ? "bg-slate-100 text-slate-500 cursor-default shadow-none" 
                    : tier.popular
                      ? "bg-amber-500 text-slate-900 hover:bg-amber-400 shadow-amber-500/20"
                      : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20"
                )}>
                  {tier.current ? 'แพ็กเกจปัจจุบัน' : tier.cta}
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Credit Wallet Info */}
      <Card className="bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Zap size={160} />
        </div>
        <CardContent className="p-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-heading font-bold text-amber-500">ใช้แค่ไหน จ่ายแค่นั้น ด้วย Slippy Credits</h2>
            <p className="text-slate-400 leading-relaxed">
              สำหรับฟีเจอร์ AI สแกนใบเสร็จ คุณสามารถเติมเครดิตเพิ่มได้ตามต้องการในราคาเริ่มต้นเพียงใบละ 1-2 บาท 
              เครดิตไม่มีวันหมดอายุ และใช้งานได้ทันทีหลังเติมเงิน
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <Check size={14} className="text-emerald-500" /> ไม่มีวันหมดอายุ
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <Check size={14} className="text-emerald-500" /> เติมขั้นต่ำ 50.-
              </span>
            </div>
          </div>
          <button className="px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-2xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 active:scale-95 whitespace-nowrap">
            เติมเครดิตเลย
          </button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
