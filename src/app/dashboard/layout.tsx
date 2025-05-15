import DesktopMenu from "@/components/desktop_modules/DesktopMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-screen pt-16 overflow-hidden">
      <section className="h-full flex flex-row">
        <div className="h-full w-1/4 min-w-[420px]">
          <DesktopMenu />
        </div>
        <div className="h-full w-full overflow-y-auto">{children}</div>
      </section>
    </main>
  );
}
