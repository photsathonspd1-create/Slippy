"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  FileImage, 
  X, 
  FileText, 
  Download, 
  Settings, 
  Zap,
  Info
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function ScanPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isOptimizing, setIsOptimizing] = useState(true)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Dropzone */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2 border-dashed border-slate-200 bg-white hover:border-amber-500 hover:bg-amber-50/10 transition-all group">
            <CardContent className="p-12">
              <input 
                type="file" 
                multiple 
                accept="image/*,.heic" 
                className="hidden" 
                id="file-upload"
                onChange={handleFileChange}
              />
              <label 
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center gap-4 cursor-pointer"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-amber-500 group-hover:text-slate-900 transition-all shadow-sm">
                  <Upload size={32} />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-heading font-bold text-slate-800">ลากและวางรูปภาพใบเสร็จ</h3>
                  <p className="text-sm text-slate-400 mt-1">รองรับ PNG, JPG, HEIC (สูงสุด 20 ไฟล์)</p>
                </div>
                <button 
                  type="button"
                  className="mt-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  เลือกไฟล์จากเครื่อง
                </button>
              </label>
            </CardContent>
          </Card>

          {/* Preview Grid */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {files.map((file, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={idx} 
                  className="aspect-[3/4] bg-white border border-slate-200 rounded-2xl overflow-hidden relative group"
                >
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 p-2">
                    <button 
                      onClick={() => removeFile(idx)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="h-full w-full flex items-center justify-center bg-slate-50 text-slate-300">
                    <FileImage size={40} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-white/90 backdrop-blur-sm border-t border-slate-100 text-[10px] font-bold text-slate-600 truncate">
                    {file.name}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Tips Box */}
          <div className="p-6 bg-slate-900 text-slate-100 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Zap size={80} />
            </div>
            <div className="flex items-start gap-4 relative z-10">
              <div className="p-2 bg-amber-500 rounded-lg text-slate-900">
                <Info size={20} />
              </div>
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-amber-500">เทคนิคการสแกนให้แม่นยำ</h4>
                <ul className="text-xs space-y-1 text-slate-400 list-disc ml-4">
                  <li>ถ่ายรูปในที่ที่มีแสงสว่างเพียงพอ</li>
                  <li>วางใบเสร็จบนพื้นผิวที่ตัดกับสีของกระดาษ</li>
                  <li>พยายามให้เห็นขอบใบเสร็จครบทั้ง 4 ด้าน</li>
                  <li>หากรูปเอียง AI จะช่วยปรับให้ตรงอัตโนมัติ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Summary Panel */}
        <div className="space-y-6">
          <Card>
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-heading font-bold text-slate-800">สรุปข้อมูล</h3>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">จำนวนไฟล์</span>
                  <span className="font-bold text-slate-800">{files.length} ไฟล์</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">ขนาดรวมทั้งหมด</span>
                  <span className="font-bold text-slate-800">
                    {(files.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">สถานะ</span>
                  <span className={cn(
                    "font-bold",
                    files.length > 0 ? "text-emerald-500" : "text-slate-300"
                  )}>
                    {files.length > 0 ? 'พร้อมดำเนินการ' : 'รอการอัปโหลด'}
                  </span>
                </div>
              </div>

              <div className="h-[1px] bg-slate-100"></div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings size={16} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Optimization</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isOptimizing}
                      onChange={(e) => setIsOptimizing(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed italic">
                  * ปรับขนาดและคุณภาพไฟล์ให้เหมาะสมที่สุดสำหรับงานเอกสาร (ลดขนาด PDF ลง 50-70%)
                </p>
              </div>

              <button 
                disabled={files.length === 0}
                className={cn(
                  "w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold shadow-lg transition-all active:scale-95",
                  files.length > 0 
                    ? "bg-amber-500 text-slate-900 hover:bg-amber-400 shadow-amber-500/20" 
                    : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none"
                )}
              >
                <FileText size={20} />
                สร้างและดาวน์โหลด PDF
              </button>
              
              {files.length > 0 && (
                <p className="text-center text-[10px] font-bold text-emerald-500 animate-pulse">
                  AI พร้อมสแกนข้อมูลเข้าสู่ระบบทันที
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="p-4 bg-blue-50 border-blue-100">
            <div className="flex gap-3">
              <Download size={20} className="text-blue-500" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-blue-800 uppercase">Pro Tip:</p>
                <p className="text-[10px] text-blue-700 leading-relaxed">
                  คุณสามารถส่งรูปใบเสร็จเข้า LINE Official ของเราเพื่อสแกนและบันทึกรายการได้เร็วกว่า!
                </p>
                <button className="text-[10px] font-bold text-blue-600 underline">เชื่อมต่อ LINE</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
