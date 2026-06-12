export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 p-8 space-y-6 flex flex-col items-center">
    <div className="w-full max-w-4xl">{children}</div>
    <div className="w-full max-w-4xl grid grid-cols-2 gap-6">{analytics}{team}</div>
  </div>
  );
}
