# 🚀 Tryout System - Frontend

Modern online exam platform with real-time proctoring built with Next.js 15, React Query, and TypeScript.

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand + React Query
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form + Zod
- **Real-time:** Socket.io Client
- **UI Components:** shadcn/ui (Radix UI + Tailwind)

## 📁 Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, register)
│   ├── (dashboard)/       # Dashboard routes
│   └── (exam)/            # Exam routes
├── components/
│   ├── features/          # Feature-specific components
│   ├── layouts/           # Layout components
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── api/              # API client functions
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand stores
│   └── utils/            # Utility functions
├── schemas/              # Zod validation schemas
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Backend API running on `http://localhost:3000`

### Installation
```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Run development server
pnpm dev
```

### Available Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
pnpm format       # Format code with Prettier
```

## 🔐 Authentication Flow

1. User enters credentials
2. Frontend calls `/api/v1/auth/login`
3. Backend returns `accessToken` + `refreshToken`
4. Tokens stored in cookies
5. Axios interceptor attaches token to all requests
6. Auto-refresh on 401 errors

## 📡 API Integration

All API calls go through centralized Axios instance:
```typescript
import { api } from '@/lib/api/axios';

// Automatically includes Authorization header
const response = await api.get('/exams');
```

## 🎯 Key Features

- ✅ Type-safe environment variables
- ✅ Automatic token refresh
- ✅ React Query for server state
- ✅ Zustand for client state
- ✅ Form validation with Zod
- ✅ Real-time proctoring
- ✅ Responsive design
- ✅ Dark mode support

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 🤝 Contributing

1. Create feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details
