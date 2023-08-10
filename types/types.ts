export interface DataItem {
  id: number
  order_no: string
  merchant_id: string
  created_by: string
  date_needed: string
  remarks: string | null
  status: string
  date_created: string
  date_modified: string | null
}
export interface sortingType {
  key: null | keyof DataItem
  order: string
}

export interface pageSettingsType {
  totalItems: number
  pageLimit: number
  currentPage: number
}
export interface itemRangeType {
  start: number
  end: number
}
