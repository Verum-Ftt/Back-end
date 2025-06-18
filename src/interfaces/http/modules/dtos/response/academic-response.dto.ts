import { z } from 'zod';
import { Academic } from '../../../../../core/entities/academic.entity';

// Esquema Zod para a resposta (útil para consistência e documentação)
export const AcademicResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  active: z.boolean(),
  phone: z.string(),
  RA: z.string(),
  date_created: z.date(),
});

export type AcademicResponseDto = z.infer<typeof AcademicResponseSchema>;

// Função para mapear a entidade de domínio para o DTO de resposta
export function toAcademicResponseDto(academic: Academic): AcademicResponseDto {
  return {
    id: academic.id!,
    name: academic.name,
    email: academic.email,
    active: academic.active,
    phone: academic.phone,
    RA: academic.RA,
    date_created: academic.date_created,
  };
}