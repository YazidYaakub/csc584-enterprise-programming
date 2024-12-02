import { z } from 'zod'
import { create } from 'zustand'

import { User } from '@/schema/entity'

const TokenSchema = z.object({
  userId: z.number(),
  name: z.string(),
  role: z.enum(['STUDENT', 'ADVISOR', 'SUPERVISOR', 'ADMIN']),
  companyId: z.number().optional(),
  universityId: z.number().optional(),
  exp: z.number(),
  iat: z.number(),
  iss: z.string()
})

type Token = z.infer<typeof TokenSchema>

type AuthStore = {
  isAuthenticated: boolean
  setAuthenticated: () => void

  token: Token | undefined
  getToken: () => boolean

  advisor: User | undefined
  setAdvisor: (advisor: User) => void

  supervisor: User | undefined
  setSupervisor: (supervisor: User) => void

  logout: () => void
}

export const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: !!localStorage.getItem('interntrack-token'),
  setAuthenticated: () => set({ isAuthenticated: true }),

  token: undefined,
  getToken: () => {
    const token = localStorage.getItem('interntrack-token')

    if (token) {
      const parsedToken = JSON.parse(atob(token.split('.')[1]))
      const { success, data, error } = TokenSchema.safeParse(parsedToken)

      if (!success) {
        console.error(error)
        return false
      }

      const isValid = data.exp * 1000 > Date.now()
      if (!isValid) {
        console.error('Token expired')
        set({ isAuthenticated: false, token: undefined })
        return false
      }

      set({ isAuthenticated: true, token: data })
      return true
    } else {
      console.error('Token not found')
      return false
    }
  },

  advisor: undefined,
  setAdvisor: advisor => set({ advisor }),

  supervisor: undefined,
  setSupervisor: supervisor => set({ supervisor }),

  logout: () => {
    localStorage.removeItem('interntrack-token')
    set({ token: undefined, advisor: undefined, supervisor: undefined, isAuthenticated: false })
  }
}))
