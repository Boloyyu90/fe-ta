// features/auth/index.ts - PUBLIC API
/**
 * Auth Feature
 *
 * Handles user authentication:
 * - Login
 * - Register
 * - Logout
 * - Token management
 */

// Components
export { LoginForm } from './components/LoginForm';
export { RegisterForm } from './components/RegisterForm';

// Hooks
export { useLogin } from './hooks/useLogin';
export { useRegister } from './hooks/useRegister';
export { useLogout } from './hooks/useLogout';

// Store
export { useAuthStore } from './store/authStore';

// Types
export type {
    User,
    LoginCredentials,
    RegisterCredentials,
    AuthResponse,
    Tokens,
} from './types/auth.types';

// Schemas
export { loginSchema, registerSchema } from './schemas';