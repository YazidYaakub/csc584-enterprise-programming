export type Pagination<T> = {
  page: number
  size: number
  total: number
  data: T[]
}
