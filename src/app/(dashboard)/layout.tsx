import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"
import MobileNav from "@/components/layout/MobileNav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 lg:ml-[260px] flex flex-col min-w-0 pb-20 lg:pb-0">
        <TopBar />
        <main className="p-4 md:p-6 w-full max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}


