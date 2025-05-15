export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-screen w-screen pt-16">{children}</main>;
}
