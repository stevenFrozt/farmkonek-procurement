export default function ItemLabel({ label = "Label", value = "Value" }) {
  return (
    <div className="flex items-center justify-between lg:pr-8 md:pr-2  lg:text-base text-md md:text-sm  ">
      <label className="font-semibold">{label}</label>
      <span className="text-slate-500">{value}</span>
    </div>
  )
}
