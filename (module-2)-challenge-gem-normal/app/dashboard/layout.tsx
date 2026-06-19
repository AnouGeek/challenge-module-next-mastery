export default function DashboardLayout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <div className="p-4 border-2 border-blue-500">
      <h2 className="text-center mb-30 text-purple-400">Layout du Dashboard</h2>

      <div className="flex gap-4 mt-4">
        <div className="flex-1">{children}</div>

        <div className="flex-1">{team}</div>

        <div className="flex-1">{analytics}</div>
      </div>
    </div>
  );
}
