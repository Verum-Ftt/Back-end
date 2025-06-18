import { z } from 'zod';

export const CreateAcademicSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  email: z.string().email('Invalid email format.'),
  phone: z.string().min(10, 'Invalid phone.'),
  RA: z.string().min(5, 'Invalid RA.'), 
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export type CreateAcademicRequestDto = z.infer<typeof CreateAcademicSchema>;

export const UpdateAcademicSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  email: z.string().email('Invalid email format.'),
  phone: z.string().min(10, 'Invalid phone.'),
  RA: z.string().min(5, 'Invalid RA.'), 
});

export type UpdateAcademicRequestDto = z.infer<typeof UpdateAcademicSchema>;