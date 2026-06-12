export default function AnalyticsSlot() {
  return (
    <div className="p-6 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
      <h2 className="text-lg font-bold text-blue-800 mb-2">📈 Analytics</h2>
      <p className="text-blue-600">
        Ceci est une route parallèle injectée depuis le slot analytics.
      </p>
    </div>
  );
}