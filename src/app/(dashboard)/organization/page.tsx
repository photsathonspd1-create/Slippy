"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Settings2,
  Plus,
  ChevronRight,
  Globe,
  Phone,
  CreditCard,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Scan,
  LayoutDashboard,
  LogOut,
  X,
  Briefcase,
  Hash,
  Crown,
  History,
  LayoutGrid,
  Menu,
  Upload,
  ChevronDown,
  Save,
  Lock
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

// --- Micro-Components with Absolute Fidelity ---

const TabButton = ({ id, label, icon: Icon, active, onClick, beta }: any) => (
  <button
    id={id}
    role="tab"
    aria-selected={active}
    data-state={active ? 'active' : 'inactive'}
    onClick={onClick}
    className={cn(
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex items-center justify-center gap-2 py-1 whitespace-nowrap h-full text-slate-400 data-[state=active]:text-blue-600 font-black px-5 transition-all bg-transparent text-sm hover:text-slate-600 relative outline-none cursor-pointer border-none shadow-none shrink-0",
      active && "after:block after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full"
    )}
  >
    <div className="flex items-center gap-2 relative z-10">
      <Icon size={16} className={cn("transition-colors", active ? "text-blue-600" : "text-slate-300")} />
      {label}
      {beta && (
        <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200/50 ml-1.5 shadow-sm shrink-0">BETA</span>
      )}
    </div>
  </button>
)

const EditableRow = ({ label, value, icon: Icon, colorClass, isPlaceholder, onSave }: any) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  if (isEditing) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 sm:p-6 bg-slate-50/50">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">แก้ไข{label}</span>
          </div>
          <input 
            type="text" 
            value={tempValue} 
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full px-5 h-12 bg-white rounded-2xl border-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-sm shadow-xl shadow-blue-900/5 outline-none text-slate-900"
            placeholder={isPlaceholder ? value : ""}
            autoFocus
          />
          <div className="flex gap-3">
            <button 
              onClick={() => { onSave(tempValue); setIsEditing(false); }}
              className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-black bg-blue-600 text-white px-6 h-12 flex-1 rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Save size={16} /> บันทึกข้อมูล
            </button>
            <button 
              onClick={() => { setTempValue(value); setIsEditing(false); }}
              className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold bg-white text-slate-400 px-6 h-12 rounded-2xl hover:bg-slate-50 hover:text-slate-600 transition-all active:scale-[0.98]"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div 
      onClick={() => setIsEditing(true)}
      className="flex items-center justify-between p-5 sm:p-7 group transition-all cursor-pointer hover:bg-slate-50/30 active:bg-slate-50 border-none"
    >
      <div className="flex items-center gap-4 sm:gap-6 text-left min-w-0">
        <div className={cn("size-10 sm:size-12 flex items-center justify-center rounded-2xl transition-transform group-hover:scale-110 shadow-lg shadow-slate-200/40 bg-white shrink-0", colorClass)}>
          <Icon size={18} className="sm:size-5" />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest text-left truncate">{label}</span>
          <span className={cn("text-xs sm:text-sm font-black leading-tight text-left truncate", isPlaceholder ? "text-slate-300 font-medium" : "text-slate-900")}>
            {value || "ยังไม่ได้ระบุ"}
          </span>
        </div>
      </div>
      <div className="size-8 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-all shrink-0">
         <ChevronRight size={16} className="text-slate-200 group-hover:text-blue-400 transition-colors" />
      </div>
    </div>
  )
}

const PermissionItem = ({ label, description, checked, onChange }: any) => (
  <div className="flex items-center justify-between p-5 sm:p-7 bg-white transition-colors group hover:bg-slate-50/20 border-none">
    <div className="flex flex-col gap-0.5 min-w-0 pr-4">
       <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate">{label}</span>
       <span className="text-[10px] sm:text-[11px] text-slate-400 leading-relaxed font-bold line-clamp-2">{description}</span>
    </div>
    <button 
      type="button" 
      role="switch" 
      onClick={() => onChange(!checked)}
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-none shadow-none transition-all outline-none",
        checked ? "bg-blue-600" : "bg-slate-200"
      )}
    >
      <span className={cn(
        "bg-white pointer-events-none block rounded-full ring-0 transition-transform size-4 shadow-lg",
        checked ? "translate-x-4.5" : "translate-x-0.5"
      )}></span>
    </button>
  </div>
)

// --- Main Page Component ---

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState('GENERAL')
  
  const [orgData, setOrgData] = useState({
    nameTh: "บริษัท ทดสอบ จำกัด",
    nameEn: "",
    taxId: "1234567890123",
    type: "กลุ่มบุคคล / กองมรดก",
    address: "123 Test St, Bangkok 10110",
    addressEn: "",
    branchCode: "00000",
    phone: ""
  })

  const [perms, setPerms] = useState({
    dashboard: true,
    scan: true,
    record: true,
    edit: false,
    export: true,
    sales: true
  })

  const handleProfileLockClick = () => {
    toast.warning("ฟีเจอร์สำหรับสมาชิก Business ขึ้นไป", {
      description: "อัปเกรดเป็นแผนที่สูงขึ้น (ตั้งแต่แผน Business ขึ้นไป) เพื่อแสดงโลโก้ธุรกิจของคุณลงบนเอกสารทุกฉบับ",
      icon: <Lock size={16} className="text-amber-500" />,
      style: {
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }
    })
  }

  const handleAddBranchLockClick = () => {
    toast.info("กรุณาอัปเกรดเป็นแผน ENTERPRISE เพื่อเพิ่มสาขา", {
      description: "ฟีเจอร์จัดการหลายสาขาสงวนไว้สำหรับสมาชิก ENTERPRISE เท่านั้น",
      icon: <Lock size={16} className="text-amber-500" />,
      style: {
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 lg:pb-0 font-body">
      <div className="max-w-[1400px] mx-auto p-4 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT SIDEBAR */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-10">
             <div id="tour-org-logo" className="bg-white rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.04)] overflow-hidden border-none">
                <div className="p-8 lg:p-10">
                   <div className="flex items-start justify-between">
                      <div id="tour-org-logo-m" className="relative group cursor-pointer" onClick={handleProfileLockClick}>
                         <div className="size-20 lg:size-24 rounded-[28px] bg-linear-to-tr from-blue-600 to-indigo-500 p-[4px] shadow-2xl shadow-blue-600/20 transition-transform active:scale-95 relative z-10">
                            <div className="w-full h-full rounded-[24px] bg-white flex items-center justify-center text-blue-600 font-black text-4xl shadow-inner">
                               S
                            </div>
                         </div>
                         <div className="absolute -bottom-1 -right-1 z-20 size-8 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-all bg-amber-400 group-hover:scale-110 active:scale-90">
                            <Lock size={14} className="text-amber-900" />
                         </div>
                         <div className="absolute inset-0 bg-blue-600 rounded-full rotate-6 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                         <div className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100/50 shadow-sm shadow-blue-100">
                            <span className="text-[10px] font-black uppercase tracking-widest">Slippy FREE</span>
                         </div>
                         <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full"><Crown size={12} className="text-amber-400 fill-amber-400" /><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">OWNER</span></span>
                      </div>
                   </div>
                   
                   <div className="mt-10 space-y-5">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{orgData.nameTh}</h2>
                      <div className="space-y-2">
                         <div className="flex items-center gap-2.5 text-slate-800">
                            <div className="size-6 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg"><Building2 size={12} /></div>
                            <p className="text-sm font-black">{orgData.type}</p>
                         </div>
                         <div className="flex items-start gap-2.5 text-slate-500">
                            <div className="size-6 flex items-center justify-center bg-slate-50 text-slate-400 rounded-lg shrink-0 mt-0.5"><MapPin size={12} /></div>
                            <p className="text-sm font-bold leading-relaxed">{orgData.address}</p>
                         </div>
                      </div>
                   </div>

                   <div id="tour-org-stats" className="mt-10 grid grid-cols-2 gap-4">
                      <div className="p-6 bg-slate-50/50 rounded-[2rem] flex flex-col items-center group cursor-default transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">สาขา</span>
                         <span className="text-2xl font-black text-slate-800 tracking-tighter">1/1</span>
                      </div>
                      <div className="p-6 bg-slate-50/50 rounded-[2rem] flex flex-col items-center group cursor-default transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">สมาชิก</span>
                         <span className="text-2xl font-black text-slate-800 tracking-tighter">1/1</span>
                      </div>
                   </div>
                </div>
             </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-7 xl:col-span-8 min-w-0">
             <div className="flex flex-col gap-8">
                {/* Tabs Bar (Fixed Scroll & Containment) */}
                <div className="relative bg-white shadow-[0_10px_30px_rgba(0,0,0,0.02)] backdrop-blur-md rounded-[1.5rem] p-1.5 lg:w-fit border-none max-w-full">
                   <div 
                      role="tablist" 
                      className="flex gap-1 h-12 justify-start relative overflow-x-auto no-scrollbar w-full lg:w-fit flex-nowrap scroll-smooth px-1"
                      style={{ WebkitOverflowScrolling: 'touch' }}
                   >
                      <TabButton id="tour-org-general-tab" label="นิติบุคคล" icon={Building2} active={activeTab === 'GENERAL'} onClick={() => setActiveTab('GENERAL')} />
                      <TabButton id="tour-org-branches-tab" label="สาขา" icon={MapPin} active={activeTab === 'BRANCHES'} onClick={() => setActiveTab('BRANCHES')} />
                      <TabButton id="tour-org-members-tab" label="สมาชิกทีม" icon={Users} active={activeTab === 'MEMBERS'} onClick={() => setActiveTab('MEMBERS')} />
                      <TabButton id="tour-org-permissions-tab" label="สิทธิ์การใช้งาน" icon={ShieldCheck} active={activeTab === 'PERMISSIONS'} onClick={() => setActiveTab('PERMISSIONS')} beta />
                      <TabButton id="tour-org-settings-tab" label="ตั้งค่า" icon={Settings2} active={activeTab === 'SETTINGS'} onClick={() => setActiveTab('SETTINGS')} />
                   </div>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
                   <AnimatePresence mode="wait">
                      {activeTab === 'GENERAL' && (
                        <motion.div key="gen" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} role="tabpanel" data-state="active" className="space-y-6">
                           <Card className="rounded-[2.5rem] border-none shadow-[0_30px_70px_rgba(0,0,0,0.03)] overflow-hidden bg-white gap-0">
                              <div data-slot="card-header" className="bg-slate-50/50 px-8 py-8 border-none">
                                 <div className="flex items-center gap-3 mb-1.5">
                                    <div className="size-8 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-600/30"><Building2 size={18} /></div>
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">ข้อมูลนิติบุคคล (Corporation)</h3>
                                 </div>
                                 <p className="text-xs text-slate-400 font-bold leading-relaxed">ข้อมูลส่วนกลางที่ใช้เหมือนกันทุกสาขา และปรากฏบนหัวเอกสารภาษี</p>
                              </div>
                              <div className="divide-y-0">
                                 <EditableRow label="ชื่อธุรกิจ (TH)" value={orgData.nameTh} icon={Building2} colorClass="text-blue-600" onSave={(v: string) => setOrgData({...orgData, nameTh: v})} />
                                 <EditableRow label="ชื่อธุรกิจ (EN)" value={orgData.nameEn} icon={Globe} colorClass="text-indigo-600" isPlaceholder={!orgData.nameEn} onSave={(v: string) => setOrgData({...orgData, nameEn: v})} />
                                 <EditableRow label="เลขประจำตัวผู้เสียภาษี (TAX ID)" value={orgData.taxId} icon={Hash} colorClass="text-slate-600" onSave={(v: string) => setOrgData({...orgData, taxId: v})} />
                                 
                                 <div className="flex items-center justify-between p-7 bg-white transition-colors group hover:bg-slate-50/50 border-none">
                                    <div className="flex items-center gap-6 min-w-0 pr-4">
                                       <div className="size-12 flex items-center justify-center bg-white shadow-2xl shadow-emerald-200/60 text-emerald-600 rounded-2xl shrink-0"><ShieldCheck size={24} /></div>
                                       <div className="flex flex-col gap-0.5 min-w-0">
                                          <span className="text-sm font-black text-slate-900 leading-tight truncate">จดทะเบียนภาษีมูลค่าเพิ่ม (VAT)</span>
                                          <span className="text-[11px] font-black text-blue-600/50 uppercase tracking-widest leading-relaxed line-clamp-2">* จำเป็นต้องกรอกข้อมูลให้ครบเพื่อใช้ออกใบกำกับภาษี</span>
                                       </div>
                                    </div>
                                    <button type="button" role="switch" className="bg-slate-200 inline-flex h-5 w-9 rounded-full border-none transition-all outline-none cursor-pointer shrink-0">
                                       <span className="bg-white block rounded-full size-4 shadow-xl translate-x-0.5"></span>
                                    </button>
                                 </div>

                                 <div className="flex flex-col p-7 group active:bg-slate-50 transition-colors cursor-pointer border-none">
                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center gap-6 text-left min-w-0">
                                          <div className="size-12 flex items-center justify-center bg-white shadow-2xl shadow-violet-200/60 text-violet-600 rounded-2xl shrink-0"><Briefcase size={24} /></div>
                                          <div className="flex flex-col gap-0.5 min-w-0">
                                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ประเภทนิติบุคคล</span>
                                             <div className="flex items-center gap-2 mt-1 truncate">
                                                <span className="text-sm font-black text-slate-900 truncate">{orgData.type}</span>
                                                <ChevronDown size={14} className="text-slate-300 group-hover:text-blue-400 shrink-0" />
                                             </div>
                                          </div>
                                       </div>
                                       <div className="size-10 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-all shrink-0">
                                          <ChevronRight size={20} className="text-slate-200" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </Card>
                        </motion.div>
                      )}

                      {activeTab === 'BRANCHES' && (
                        <motion.div key="br" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} role="tabpanel" data-state="active" className="space-y-8">
                           <div className="px-2 flex items-center justify-between">
                              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">สาขาที่เปิดใช้งาน <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full ml-2 font-black text-[10px]">1/1</span></h3>
                              <button 
                                onClick={handleAddBranchLockClick}
                                className="text-blue-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 px-6 py-2.5 bg-blue-50 hover:bg-blue-100 rounded-full transition-all active:scale-95 shadow-sm shadow-blue-100"
                              >
                                <Lock size={14} className="text-blue-600" /> เพิ่มสาขา
                              </button>
                           </div>
                           
                           <div className="flex items-start gap-8 overflow-x-auto pb-6 no-scrollbar">
                              <div className="flex flex-col items-center gap-4 shrink-0 group active:scale-95 transition-all cursor-pointer">
                                 <div className="size-[68px] rounded-[24px] bg-blue-600 p-[3px] shadow-2xl shadow-blue-600/10 flex items-center justify-center relative">
                                    <div className="w-full h-full rounded-[21px] bg-white flex items-center justify-center border border-white/20 shadow-inner">
                                       <Building2 size={32} className="text-blue-600" />
                                    </div>
                                 </div>
                                 <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">สำนักงานใหญ่</span>
                              </div>

                              <div className="flex flex-col items-center gap-4 shrink-0 group cursor-pointer relative" onClick={handleAddBranchLockClick}>
                                 <div className="size-[68px] rounded-[24px] bg-slate-50/50 p-[3px] flex items-center justify-center border border-slate-200 border-dashed group-hover:bg-slate-100 transition-colors group-active:bg-slate-200">
                                    <div className="w-full h-full rounded-[21px] flex items-center justify-center">
                                       <Plus size={36} className="text-slate-400 stroke-[1px]" />
                                    </div>
                                 </div>
                                 <div className="absolute top-12 -right-1 z-20 size-8 rounded-full border-4 border-white flex items-center justify-center shadow-2xl bg-amber-400 group-hover:scale-110 transition-transform">
                                    <Lock size={12} className="text-amber-900 fill-amber-900/10" />
                                 </div>
                                 <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">เพิ่มสาขา</span>
                              </div>
                           </div>

                           <Card className="rounded-[2.5rem] border-none shadow-[0_30px_70px_rgba(0,0,0,0.03)] overflow-hidden bg-white gap-0">
                              <div className="bg-slate-50/50 px-8 py-8">
                                 <div className="flex items-center gap-3 mb-1.5">
                                    <div className="size-8 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-600/30"><MapPin size={18} /></div>
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">ข้อมูลที่อยู่ที่ตั้ง (Branch Info)</h3>
                                 </div>
                                 <p className="text-xs text-slate-400 font-bold leading-relaxed">ตั้งค่าข้อมูลที่อยู่และรหัสสาขาเฉพาะจุดนี้</p>
                              </div>
                              <div className="divide-y-0">
                                 <EditableRow label="รหัสสาขา (Branch Code)" value={orgData.branchCode} icon={Hash} colorClass="text-slate-600" onSave={(v: string) => setOrgData({...orgData, branchCode: v})} />
                                 <EditableRow label="เบอร์โทรศัพท์ธุรกิจ" value={orgData.phone} icon={Phone} colorClass="text-slate-400" isPlaceholder={!orgData.phone} onSave={(v: string) => setOrgData({...orgData, phone: v})} />
                                 <EditableRow label="ที่อยู่สาขา (จัดทำเอกสาร)" value={orgData.address} icon={MapPin} colorClass="text-slate-600" onSave={(v: string) => setOrgData({...orgData, address: v})} />
                                 <EditableRow label="ที่อยู่ภาษาอังกฤษ (English Address)" value={orgData.addressEn} icon={Globe} colorClass="text-slate-400" isPlaceholder={!orgData.addressEn} onSave={(v: string) => setOrgData({...orgData, addressEn: v})} />
                              </div>
                           </Card>
                        </motion.div>
                      )}

                      {activeTab === 'MEMBERS' && (
                        <motion.div key="mem" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} role="tabpanel" data-state="active" className="space-y-6">
                           <Card className="rounded-[2.5rem] border-none shadow-[0_30px_70px_rgba(0,0,0,0.03)] overflow-hidden bg-white gap-0">
                              <div className="bg-slate-50/50 px-8 py-7 flex justify-between items-center">
                                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">สมาชิกทั้งหมด (1)</h3>
                              </div>
                              <div className="divide-y-0">
                                 {/* Responsive Member Card - FIXED OVERLAP */}
                                 <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-8 bg-white transition-colors group cursor-pointer hover:bg-slate-50/50 border-none gap-6 sm:gap-4">
                                    <div className="flex items-center gap-5 sm:gap-7 min-w-0">
                                       <div className="relative shrink-0">
                                          <div className="size-14 sm:size-16 rounded-2xl sm:rounded-3xl bg-blue-600 flex items-center justify-center text-white font-black text-xl sm:text-2xl border-4 border-white shadow-2xl shadow-blue-600/20">U</div>
                                          <div className="absolute -top-2 -right-2 size-7 sm:size-8 bg-amber-400 rounded-full border-4 border-white flex items-center justify-center shadow-xl">
                                             <Crown size={12} className="text-white fill-white" />
                                          </div>
                                       </div>
                                       <div className="flex flex-col gap-0.5 min-w-0">
                                          <p className="text-base sm:text-lg font-black text-slate-900 truncate tracking-tight">สมชาย ใจดี</p>
                                          <p className="text-xs font-bold text-slate-400 truncate tracking-wide">photsathon.spd1@gmail.com</p>
                                       </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-5">
                                       <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 sm:px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-sm border border-blue-100/50 whitespace-nowrap">เจ้าของ</span>
                                       <div className="size-10 sm:size-12 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-all text-slate-200 group-hover:text-blue-400 shrink-0">
                                          <ChevronRight size={20} />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="p-10 text-center bg-slate-50/10 border-none">
                                 <button className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-2 mx-auto transition-all hover:scale-105 active:scale-95"><Plus size={18} /> เชิญสมาชิกเข้าร่วมทีม</button>
                              </div>
                           </Card>
                        </motion.div>
                      )}

                      {activeTab === 'PERMISSIONS' && (
                        <motion.div key="perm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} role="tabpanel" data-state="active" className="space-y-6">
                           <Card className="rounded-[2.5rem] border-none shadow-[0_30px_70px_rgba(0,0,0,0.03)] overflow-hidden bg-white gap-0">
                              <div className="flex overflow-x-auto border-b border-transparent bg-slate-50/50 no-scrollbar p-3">
                                 {['ผู้ดูแลระบบ', 'นักบัญชี (ภายใน)', 'พนักงาน', 'สมาชิก'].map((r, i) => (
                                    <button key={r} className={cn(
                                       "shrink-0 flex items-center gap-3 px-8 py-4 text-xs font-black transition-all rounded-[1.5rem] border-none",
                                       i === 0 ? "bg-white text-blue-600 shadow-2xl shadow-blue-900/10" : "text-slate-400 hover:text-slate-600 hover:bg-white/40"
                                    )}>
                                       {r}
                                       {i === 0 && <span className="size-2 rounded-full bg-blue-600 animate-pulse shadow-lg shadow-blue-200"></span>}
                                    </button>
                                 ))}
                              </div>
                              <div className="divide-y-0">
                                 <PermissionItem label="ดูภาพรวมการเงิน" description="เข้าถึง Dashboard สรุปรายรับ-รายจ่ายและสถิติ" checked={perms.dashboard} onChange={(v:any) => setPerms({...perms, dashboard: v})} />
                                 <PermissionItem label="สแกน/อัปโหลดใบเสร็จ" description="อัปโหลดรูปภาพหรือ PDF เพื่อสแกนด้วย OCR" checked={perms.scan} onChange={(v:any) => setPerms({...perms, scan: v})} />
                                 <PermissionItem label="บันทึกรายจ่าย/รายรับ" description="พิมพ์บันทึกรายการด้วยตนเองผ่านเว็บหรือ LINE" checked={perms.record} onChange={(v:any) => setPerms({...perms, record: v})} />
                                 <PermissionItem label="แก้ไข/ลบเอกสาร" description="แก้ไขข้อมูลหรือลบเอกสารที่มีอยู่" checked={perms.edit} onChange={(v:any) => setPerms({...perms, edit: v})} />
                                 <PermissionItem label="Export ข้อมูล" description="ส่งออก CSV / รายงานบัญชีและภาษี" checked={perms.export} onChange={(v:any) => setPerms({...perms, export: v})} />
                                 <PermissionItem label="เอกสารขาย" description="เข้าถึงหน้าเอกสารขาย สร้างใบเสนอราคา/ใบแจ้งหนี้" checked={perms.sales} onChange={(v:any) => setPerms({...perms, sales: v})} />
                              </div>
                              <div className="p-8 bg-blue-50/30 flex justify-between items-center border-none">
                                 <div className="flex items-center gap-3">
                                    <div className="size-3 rounded-full bg-blue-500 shadow-xl shadow-blue-200 animate-pulse"></div>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">การเปลี่ยนแปลงมีผลทันที</p>
                                 </div>
                                 <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-red-500 transition-colors">รีเซ็ตสิทธิ์</button>
                              </div>
                           </Card>
                        </motion.div>
                      )}

                      {activeTab === 'SETTINGS' && (
                        <motion.div key="sett" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} role="tabpanel" data-state="active" className="space-y-8">
                           <Card className="rounded-[2.5rem] border-none shadow-[0_30px_70px_rgba(0,0,0,0.03)] overflow-hidden bg-white gap-0">
                              <div className="bg-slate-50/50 px-8 py-8 border-none">
                                 <div className="flex items-center gap-3 mb-1.5">
                                    <div className="size-8 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-600/30"><Settings2 size={18} /></div>
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">ตั้งค่าทั่วไป</h3>
                                 </div>
                                 <p className="text-xs text-slate-400 font-bold leading-relaxed">จัดการชื่อองค์กร ค่าเริ่มต้นการบันทึก และตัวเลือกอันตราย</p>
                              </div>
                              <div className="divide-y-0">
                                 <EditableRow label="ชื่อองค์กร" value={orgData.nameTh} icon={Building2} colorClass="text-blue-600" onSave={(v: string) => setOrgData({...orgData, nameTh: v})} />
                                 
                                 <div className="p-10 space-y-10 bg-white border-none">
                                    <div className="flex items-center gap-6">
                                       <div className="size-14 flex items-center justify-center bg-white shadow-2xl shadow-blue-200/50 text-blue-600 rounded-3xl"><Phone size={28} /></div>
                                       <div className="flex flex-col gap-0.5 min-w-0 pr-2">
                                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">ค่าเริ่มต้นวิธีชำระเงิน (LINE)</span>
                                          <span className="text-[11px] text-slate-400 font-bold leading-tight mt-1 line-clamp-2">ใช้เมื่อบันทึกผ่าน LINE โดยไม่ระบุวิธีชำระ</span>
                                       </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:ml-20">
                                       <div className="space-y-4">
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">รายจ่ายผ่าน LINE</p>
                                          <div className="flex items-center justify-between text-sm font-black text-slate-900 bg-slate-50/50 p-5 rounded-[1.5rem] border-none cursor-pointer hover:bg-slate-100 transition-all shadow-sm active:scale-95">
                                             <span>ไม่ตั้งค่าเริ่มต้น</span>
                                             <ChevronDown size={18} className="text-slate-300 shrink-0" />
                                          </div>
                                       </div>
                                       <div className="space-y-4">
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">รายรับผ่าน LINE</p>
                                          <div className="flex items-center justify-between text-sm font-black text-slate-900 bg-slate-50/50 p-5 rounded-[1.5rem] border-none cursor-pointer hover:bg-slate-100 transition-all shadow-sm active:scale-95">
                                             <span>ไม่ตั้งค่าเริ่มต้น</span>
                                             <ChevronDown size={18} className="text-slate-300 shrink-0" />
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="p-12 space-y-10 border-none">
                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center gap-6 min-w-0 pr-4">
                                          <div className="size-14 flex items-center justify-center bg-white shadow-2xl shadow-slate-200/60 text-slate-600 rounded-3xl shrink-0"><CreditCard size={28} /></div>
                                          <div className="flex flex-col gap-0.5 min-w-0">
                                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">สมุดบัญชีธนาคาร</span>
                                             <span className="text-[11px] text-slate-400 font-bold leading-tight mt-1">0/1 บัญชี</span>
                                          </div>
                                       </div>
                                       <button className="text-[10px] font-black text-blue-600 bg-blue-50 px-8 py-3.5 rounded-full uppercase tracking-widest hover:bg-blue-100 transition-all active:scale-95 shadow-lg shadow-blue-100 shrink-0">เพิ่มบัญชี</button>
                                    </div>
                                    <div className="p-20 border-2 border-dashed border-slate-100 rounded-[3.5rem] text-center bg-slate-50/20">
                                       <p className="text-sm font-black text-slate-300 uppercase tracking-widest">ยังไม่มีบัญชีธนาคาร</p>
                                       <p className="text-[11px] text-slate-300 mt-2 font-bold italic opacity-60">กดเพิ่มบัญชีเพื่อเริ่มต้นระบบภาษีอัจฉริยะ</p>
                                    </div>
                                 </div>

                                 <div className="p-14 bg-red-50/20 m-10 rounded-[3.5rem] group hover:bg-red-50/30 transition-all border-none">
                                    <div className="flex items-center gap-3 mb-10">
                                       <div className="size-3 bg-red-500 rounded-full animate-pulse shadow-2xl shadow-red-200"></div>
                                       <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Danger Zone</h4>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-12">
                                       <div className="space-y-3 text-center sm:text-left min-w-0 pr-4">
                                          <p className="text-xl font-black text-slate-900 tracking-tight">ลบองค์กรนี้</p>
                                          <p className="text-sm text-slate-500 font-bold leading-relaxed max-w-sm">ข้อมูลธุรกรรม ใบเสร็จ และสถิติทั้งหมดจะถูกลบถาวรและไม่สามารถกู้คืนได้ (เก็บไว้ 30 วันก่อนทำลายถาวร)</p>
                                       </div>
                                       <button className="px-12 py-5 bg-white text-red-500 border border-red-100 rounded-3xl text-[11px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-2xl shadow-red-900/10 active:scale-95 shrink-0">ลบองค์กรถาวร</button>
                                    </div>
                                 </div>
                              </div>
                           </Card>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
