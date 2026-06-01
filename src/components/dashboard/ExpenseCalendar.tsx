import React from 'react'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ExpenseCalendar() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const expenseDays = [1, 5, 8, 12, 15, 20, 22, 25, 28]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-3">
        <h4 className="text-sm font-heading font-bold text-slate-800">ปฏิทินการใช้จ่าย</h4>
        <div className="flex gap-2 text-slate-400">
          <span className="text-sm font-bold">พฤษภาคม</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'].map(day => (
            <span key={day} className="text-[10px] text-slate-500 font-bold">{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {/* Offset for start of month placeholder */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`offset-${i}`} className="h-8"></div>
          ))}
          {days.map(day => (
            <div 
              key={day} 
              className={`h-8 flex flex-col items-center justify-center text-xs relative group cursor-pointer transition-all
                ${day === 31 ? 'bg-[#2563eb] text-white font-bold' : 'hover:bg-slate-50 text-slate-400'}
              `}
            >
              <span>{day}</span>
              {expenseDays.includes(day) && day !== 31 && (
                <span className="w-1 h-1 bg-red-400 rounded-full absolute bottom-1"></span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
