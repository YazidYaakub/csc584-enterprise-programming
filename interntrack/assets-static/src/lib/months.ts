export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const grades = [
  { value: 'A', label: 'A - Excellent' },
  { value: 'B', label: 'B - Good' },
  { value: 'C', label: 'C - Fair' },
  { value: 'D', label: 'D - Needs Improvement' },
  { value: 'E', label: 'E - Poor' },
  { value: 'F', label: 'F - Fail' }
]

export function convertToShortform(name: string) {
  return name.substring(0, 3).toUpperCase()
}
