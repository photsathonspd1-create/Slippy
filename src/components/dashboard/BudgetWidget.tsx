import React from 'react'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'ใช้ไป', value: 72, color: '#F59E0B' },
  { name: 'คงเหลือ', value: 28, color: '#E2E8F0' },
]

export default function BudgetWidget() {
  return (
    <Card>
      <CardHeader className="py-3">
        <h4 className="text-sm font-heading font-bold">งบประมาณรวม</h4>
      </CardHeader>
      <CardContent className="p-4 flex flex-col items-center">
        <div className="h-32 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pb-2">
            <p className="text-2xl font-bold text-slate-800">72%</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">ใช้ไปแล้ว</p>
          </div>
        </div>
        
        <div className="w-full mt-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">งบประมาณทั้งหมด</span>
            <span className="font-bold text-slate-800">฿60,000</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">คงเหลือ</span>
            <span className="font-bold text-emerald-500">฿14,710</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
