import React from "react"

export function sortData<T>(
  data: T[],
  key: keyof T,
  setSorting: React.Dispatch<
    React.SetStateAction<{ key: keyof T; order: "asc" | "desc" }>
  >,
  sorting: { key: keyof T; order: "asc" | "desc" }
): T[] {
  let order: "asc" | "desc" = "asc"
  if (sorting.key === key && sorting.order === "asc") {
    order = "desc"
  }
  const sortedData = [...data]?.sort((a, b) => {
    if (a[key]! < b[key]!) return order === "asc" ? -1 : 1
    if (a[key]! > b[key]!) return order === "asc" ? 1 : -1
    return 0
  })
  setSorting({ key, order })

  return sortedData
}
