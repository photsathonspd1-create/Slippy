"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Scan, 
  LineChart, 
  ShieldCheck, 
  MessageSquare, 
  ChevronRight, 
  Zap,
  CheckCircle2,
  ArrowRight,
  MousePointer2
} from 'lucide-react'
import { cn } from '@/lib/utils'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function LandingPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-900 font-bold text-2xl shadow-lg shadow-amber-500/20">S</div>
            <span className="text-2xl font-heading font-bold tracking-tight text-slate-900">Slippy</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
            <Link href="#features" className="hover:text-amber-500 transition-colors">ฟีเจอร์</Link>
            <Link href="/pricing" className="hover:text-amber-500 transition-colors">แพ็กเกจ</Link>
            <Link href="#" className="hover:text-amber-500 transition-colors">คู่มือการใช้งาน</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-amber-500 transition-colors">เข้าสู่ระบบ</Link>
            <Link href="/dashboard" className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
              เริ่มใช้งานฟรี
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          <motion.div 
            {...fadeIn}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            <Zap size={14} fill="currentColor" /> ยกระดับการทำบัญชีด้วย AI
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-5xl md:text-7xl font-heading font-extrabold text-slate-900 leading-[1.1]"
          >
            แค่แชะ <span className="text-amber-500 underline decoration-amber-200 underline-offset-8">slip</span> ก็จบ<br />
            บันทึกรายรับ-รายจ่าย ง่ายๆ
          </motion.h1>

          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            เราช่วยจัดการรายรับ-รายจ่ายส่วนตัวและธุรกิจ ให้คุณจบงานบัญชีได้ง่ายๆ 
            แค่แชะรูปใบเสร็จ AI จะดึงข้อมูลและสรุปผลให้คุณทันที
          </motion.p>

          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-2xl text-lg hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 group">
              เริ่มใช้งานฟรีทันที <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <MessageSquare size={20} className="text-emerald-500" /> สแกนง่ายผ่าน LINE
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="pt-16 max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-[40px] p-4 shadow-2xl border border-slate-100 relative group">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 shadow-xl rotate-12 group-hover:rotate-0 transition-transform z-20">
                <div className="text-center">
                  <p className="text-[10px] font-bold leading-tight">เริ่มต้น</p>
                  <p className="text-2xl font-black leading-tight">0.-</p>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" 
                alt="Slippy Dashboard" 
                className="rounded-[32px] w-full shadow-inner"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl font-heading font-bold text-slate-900">ฟีเจอร์ที่ทำให้ชีวิตคุณง่ายขึ้น</h2>
          <p className="text-slate-500">ครบครันทุกความต้องการ สำหรับการจัดการการเงินยุคใหม่</p>
        </div>

        <motion.div 
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: 'AI สแกนสลิปอัจฉริยะ', desc: 'ดึงข้อมูลร้านค้า วันที่ ยอดเงิน และภาษี จากรูปภาพได้ทันที แม่นยำกว่าที่เคย', icon: Scan, color: 'amber' },
            { title: 'สรุปงบการเงินเรียลไทม์', desc: 'เห็นภาพรวมรายรับ-รายจ่าย และแนวโน้มกระแสเงินสดของคุณได้ทุกที่ ทุกเวลา', icon: LineChart, color: 'blue' },
            { title: 'จัดการภาษีอัตโนมัติ', desc: 'คำนวณ VAT และ WHT ให้อย่างถูกต้อง พร้อมออกรายงานส่งบัญชีได้ในคลิกเดียว', icon: CheckCircle2, color: 'emerald' },
            { title: 'รองรับการทำงานเป็นทีม', desc: 'เชิญสมาชิกเข้าร่วมจัดการสาขา หรือพนักงานช่วยบันทึกรายการได้ไม่จำกัด', icon: ShieldCheck, color: 'slate' },
            { title: 'เชื่อมต่อ LINE Official', desc: 'บันทึกรายการง่ายๆ เพียงแค่ส่งรูปเข้าห้องแชท LINE ไม่ต้องเปิดแอปบ่อยๆ', icon: MessageSquare, color: 'emerald' },
            { title: 'ปลอดภัยระดับธนาคาร', desc: 'ข้อมูลของคุณถูกเข้ารหัสและจัดเก็บในระบบคลาวด์มาตรฐานสากล มั่นใจ 100%', icon: Zap, color: 'amber' },
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={fadeIn}
              className="p-8 bg-white rounded-[32px] border border-slate-100 hover:border-amber-500 transition-all hover:shadow-xl group"
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
                feature.color === 'amber' ? "bg-amber-100 text-amber-600" :
                feature.color === 'blue' ? "bg-blue-100 text-blue-600" :
                "bg-emerald-100 text-emerald-600"
              )}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-slate-900 font-bold text-xl">S</div>
              <span className="text-xl font-heading font-bold text-white tracking-tight">Slippy</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              ระบบจัดการรายรับ-รายจ่ายอัจฉริยะ ที่ช่วยให้การทำบัญชีเป็นเรื่องสนุกและง่ายขึ้นในทุกวัน พัฒนาโดยทีมงานคนไทยเพื่อธุรกิจไทย
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-bold mb-4">บริการของเรา</h4>
            <ul className="text-sm space-y-2">
              <li><Link href="#" className="hover:text-amber-500 transition-colors">ฟีเจอร์ทั้งหมด</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">แพ็กเกจราคา</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Slippy for Business</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold mb-4">ช่วยเหลือ</h4>
            <ul className="text-sm space-y-2">
              <li><Link href="#" className="hover:text-amber-500 transition-colors">คู่มือการใช้งาน</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">คำถามที่พบบ่อย</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">ติดต่อเรา</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-16 pt-8 text-xs flex flex-col md:flex-row justify-between gap-4">
          <p>© 2026 Slippy / Unyhub Automation. สงวนลิขสิทธิ์.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">ข้อกำหนดและเงื่อนไข</Link>
            <Link href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
