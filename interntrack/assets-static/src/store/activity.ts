import { Activity } from '@/schema/activity'
import { create } from 'zustand'

type useActivityStore = {
  selectedMonth: string
  setSelectedMonth: (month: string) => void

  openUpdateActivity: {
    open: boolean
    activity: Activity | undefined
    mode: 'view' | 'edit'
  }
  setOpenUpdateActivity: (args: {
    open: boolean
    activity: Activity | undefined
    mode: 'view' | 'edit'
  }) => void
}

export const useActivityStore = create<useActivityStore>((set) => ({
  selectedMonth: (new Date().getMonth() + 1).toString(),
  setSelectedMonth: (selectedMonth) => set({ selectedMonth }),

  openUpdateActivity: {
    open: false,
    activity: undefined,
    mode: 'view'
  },
  setOpenUpdateActivity: ({ open, activity, mode }) => {
    console.log('mode', mode)
    set({ openUpdateActivity: { open, activity, mode } })
  }
}))
