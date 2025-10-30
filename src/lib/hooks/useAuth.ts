/**
 * ============================================================================
 * 🔐 AUTH HOOKS (REACT QUERY)
 * ============================================================================
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';
import type { LoginCredentials, RegisterCredentials } from '@/types/api.types';
import { toast } from 'sonner';

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Login successful!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => authApi.register(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.tokens);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Registration successful!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed');
    },
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refreshToken: string) => authApi.logout(refreshToken),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast.success('Logged out successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Logout failed');
    },
  });
}
