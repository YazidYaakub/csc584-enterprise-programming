import { Activity } from '@/schema/activity'
import { create } from 'zustand'

type useActivityStore = {
  selectedMonth: string
  setSelectedMonth: (month: string) => void

  openUpdateActivity: {
    open: boolean
    activity: Activity | undefined
  }
  setOpenUpdateActivity: (args: { open: boolean; activity: Activity | undefined }) => void
}

export const useActivityStore = create<useActivityStore>((set) => ({
  selectedMonth: (new Date().getMonth() + 1).toString(),
  setSelectedMonth: (selectedMonth) => set({ selectedMonth }),

  openUpdateActivity: {
    open: false,
    activity: undefined
  },
  setOpenUpdateActivity: ({ open, activity }) => set({ openUpdateActivity: { open, activity } })
}))
