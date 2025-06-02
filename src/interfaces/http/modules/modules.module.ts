import { Module } from '@nestjs/common';
import { AcademicController } from './controllers/academic.controller'; // Ajuste o caminho se for diferente
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';
import { AuthModule } from '@/interfaces/http/auth/auth.module'; // Mantendo seu import original

// Importações necessárias para o AcademicController e suas dependências
import { CreateAcademicUseCase } from '@/core/use-cases/academic/create-academic.use-case';
import { ACADEMIC_REPOSITORY } from '@/core/repositories/academic.repository'; // A interface/token para o repositório
import { PrismaAcademicRepository } from '@/infrastructure/database/prisma/repositories/prisma-academic.repository'; // A implementação concreta do repositório

@Module({
  imports: [
    AuthModule,
    // Se o PrismaService for provido por um PrismaModule dedicado, importe-o aqui.
    // Ex: PrismaModule (se PrismaService for exportado de lá)
    // Caso contrário, e se PrismaService não tiver dependências complexas,
    // provê-lo diretamente como abaixo é aceitável para módulos menores.
  ],
  controllers: [
    AcademicController,
  ],
  providers: [
    PrismaService, // Necessário se PrismaAcademicRepository depender dele e não for provido por um PrismaModule importado.
    CreateAcademicUseCase, // Agora o NestJS saberá como injetar esta classe.
    {
      provide: ACADEMIC_REPOSITORY, // O token de injeção para a interface do repositório.
      useClass: PrismaAcademicRepository, // A classe concreta que implementa a interface.
    },
    // Se CreateAcademicUseCase tiver outras dependências, elas também precisam ser listadas aqui.
    // Por exemplo, se você tivesse um serviço para hashear senhas:
    // {
    //   provide: 'PASSWORD_HASHER_SERVICE', // Token do serviço
    //   useClass: BcryptPasswordHasherService, // Implementação do serviço
    // }
  ],
})
export class ModulesModule {}
