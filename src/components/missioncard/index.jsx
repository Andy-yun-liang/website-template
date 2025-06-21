export function MissionCard({ heading, text }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-mudgreen uppercase tracking-wide mb-1">
        {heading}
      </h3>
      <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}
