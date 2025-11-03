import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, 'Nama minimal 2 karakter')
        .max(100, 'Nama maksimal 100 karakter'),
    email: z
        .string()
        .min(1, 'Email wajib diisi')
        .email('Format email tidak valid')
        .toLowerCase(),
    password: z
        .string()
        .min(8, 'Password minimal 8 karakter')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password harus mengandung huruf besar, huruf kecil, dan angka'
        ),
    confirmPassword: z
        .string()
        .min(1, 'Konfirmasi password wajib diisi'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak cocok',
    path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;