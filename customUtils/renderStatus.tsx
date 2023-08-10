import {
  ArrowUpFromLine,
  Check,
  CheckCircle,
  RefreshCcw,
  ShoppingBag,
  XCircle
} from "lucide-react"

// RENDER STATUS
export function renderStatus(status: string) {
  const lowerCaseStatus = status.toLowerCase()
  let indicator
  let icon
  let label

  switch (lowerCaseStatus) {
    case "new":
      indicator = (
        <div className="w-3 h-3 mr-2 bg-blue-500 rounded-full ">
          <div className="w-3 h-3 animate-ping-slow bg-blue-500 rounded-full " />
        </div>
      )
      label = <p className="font-semibold text-blue-500">{status}</p>
      break
    case "submitted":
      indicator = <div className="w-3 h-3 mr-2 bg-purple-500 rounded-full" />
      icon = <ArrowUpFromLine className="w-5 h-5 text-purple-500" />
      label = <p className="font-semibold text-purple-500">{status}</p>
      break
    case "accepted":
      indicator = <div className="w-3 h-3 mr-2 bg-green-500 rounded-full" />
      icon = <CheckCircle className="w-5 h-5 text-green-500" />
      label = <p className="font-semibold text-green-500">{status}</p>
      break
    case "processing":
      indicator = <div className="w-3 h-3 mr-2 bg-yellow-500 rounded-full" />
      icon = (
        <RefreshCcw className="w-5 h-5 animate-spin-slow text-yellow-500" />
      )
      label = <p className="font-semibold text-yellow-500">{status}</p>
      break
    case "order placed":
      indicator = <div className="w-3 h-3 mr-2 bg-indigo-500 rounded-full" />
      icon = <ShoppingBag className="w-5 h-5 text-indigo-500" />
      label = <p className="font-semibold text-indigo-500">{status}</p>
      break
    case "completed":
      indicator = <div className="w-3 h-3 mr-2 bg-teal-500 rounded-full" />
      icon = <Check className="w-5 h-5 text-teal-500" />
      label = <p className="font-semibold text-teal-500">{status}</p>
      break
    case "cancelled":
      indicator = <div className="w-3 h-3 mr-2 bg-red-500 rounded-full" />
      icon = <XCircle className="w-5 h-5 text-red-500" />
      label = <p className="font-semibold text-red-500">{status}</p>
      break
    default:
      indicator = <div className="w-3 h-3 mr-2 bg-gray-400 rounded-full" />
      break
  }

  return { indicator, icon, label }
}
