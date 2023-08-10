export default function ItemLabel({ label = "Label", value = "Value" }) {
  return (
    <div className="flex items-center justify-between pr-8">
      <label className="font-semibold">{label}</label>
      <span className="text-slate-500">{value}</span>
    </div>
  )
}
