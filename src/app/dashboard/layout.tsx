import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Mobile Navbar (Dashboard version) */}
        <div className="lg:hidden">
          <Navbar />
        </div>
        <main className="flex-1 p-4 md:p-8 lg:p-10 pt-20 lg:pt-10 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
