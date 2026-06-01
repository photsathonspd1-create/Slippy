"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[80px] -ml-20 -mb-20"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8 space-y-2">
          <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto shadow-lg shadow-blue-500/20 mb-4">S</div>
          <h1 className="text-3xl font-heading font-black text-slate-900">ยินดีต้อนรับกลับมา</h1>
          <p className="text-slate-500">เข้าสู่ระบบเพื่อจัดการรายรับ-รายจ่ายของคุณ</p>
        </div>

        <Card className="border-none shadow-2xl shadow-blue-500/5">
          <CardContent className="p-8 space-y-6">
            <button className="w-full py-3 px-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
              </svg>
              เข้าสู่ระบบด้วย Google
            </button>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-x-0 h-px bg-slate-100"></div>
              <span className="relative px-4 bg-white text-xs font-bold text-slate-400 uppercase tracking-widest">หรือ</span>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">อีเมลของคุณ</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="example@gmail.com" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2">
                ส่งลิงก์เข้าสู่ระบบ <ArrowRight size={18} />
              </button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-sm text-slate-500">
          ยังไม่มีบัญชี? <Link href="/register" className="text-primary font-bold hover:underline">สมัครสมาชิกฟรี</Link>
        </p>

        <div className="mt-12 flex items-center justify-center gap-6 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">หน้าแรก</Link>
          <Link href="/privacy" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">นโยบายความเป็นส่วนตัว</Link>
          <Link href="/terms" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">ข้อกำหนดการใช้งาน</Link>
        </div>
      </motion.div>
    </div>
  )
}
