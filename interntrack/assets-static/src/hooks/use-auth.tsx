import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { api } from '@/lib/axios'
import { LoginInput } from '@/schema/login'
import { useAuthStore } from '@/store/auth'

export const useLogin = (
  message: string = 'Successfully authenticated!',
  callback?: () => object | void
) => {
  const { setAuthenticated } = useAuthStore()

  return useMutation({
    mutationFn: (loginInput: LoginInput) => api().post('auth/login', loginInput),
    onSuccess: res => {
      localStorage.setItem('interntrack-token', res.data.token)
      setAuthenticated(res.data.user)
      toast.success(message)
      if (callback) callback()
    },
    onError: (error: AxiosError) =>
      toast.error((error.response?.data as { message?: string })?.message || 'An error occurred')
  })
}
