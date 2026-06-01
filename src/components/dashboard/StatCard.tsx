import React from 'react'
import { Card, CardContent } from '../ui/Card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  subValue?: string
  icon: React.ElementType
  colorClass: string
}

export default function StatCard({ label, value, subValue, icon: Icon, colorClass }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow border-slate-100 h-full">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className={cn("p-2 rounded-full flex-shrink-0", colorClass)}>
            <Icon size={16} strokeWidth={2.5} />
          </div>
          <p className="text-slate-700 text-sm font-bold truncate">{label}</p>
        </div>
        <div>
          <p className="text-2xl font-heading font-black text-slate-800 truncate mb-1">{value}</p>
          {subValue && <p className="text-xs text-slate-500 font-medium truncate">{subValue}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

