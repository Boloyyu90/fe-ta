import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import type { LoginRequest, RegisterRequest } from '../types/api';

export function useAuth() {
  const router = useRouter();
  const { setUser, logout: logoutStore } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      setUser(data.user);

      // Redirect based on role
      if (data.user.role === 'ADMIN') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard');
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => authApi.register(userData),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      setUser(data.user);
      router.push('/dashboard');
    },
  });

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      logoutStore();
      router.push('/login');
    }
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}
