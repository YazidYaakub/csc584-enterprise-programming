import { User } from '@/schema/entity'
import { create } from 'zustand'

type AuthStore = {
  isAuthenticated: boolean
  setAuthenticated: () => void

  user: User | undefined
  setUser: (user: User) => void

  advisor: User | undefined
  setAdvisor: (advisor: User) => void

  supervisor: User | undefined
  setSupervisor: (supervisor: User) => void

  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!localStorage.getItem('interntrack-token'),
  setAuthenticated: () => set({ isAuthenticated: true }),

  user: undefined,
  setUser: (user) => set({ user }),

  advisor: undefined,
  setAdvisor: (advisor) => set({ advisor }),

  supervisor: undefined,
  setSupervisor: (supervisor) => set({ supervisor }),

  logout: () => {
    localStorage.removeItem('interntrack-token')
    set({ user: undefined, advisor: undefined, supervisor: undefined, isAuthenticated: false })
  }
}))
