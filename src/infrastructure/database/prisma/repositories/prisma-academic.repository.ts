import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 
import { Academic as PrismaAcademicModel } from '@prisma/client'; // Tipo gerado pelo Prisma
import { Academic, AcademicProps } from '../../../../core/entities/academic.entity'; 
import { AcademicRepository } from '../../../../core/repositories/academic.repository'; 

@Injectable()
export class PrismaAcademicRepository implements AcademicRepository {
  constructor(private prisma: PrismaService) {}
  
  private toDomain(prismaAcademic: PrismaAcademicModel | null): Academic | null {
    if (!prismaAcademic) {
      return null; 
    }

    return new Academic(
      {
        name: prismaAcademic.name,
        email: prismaAcademic.email,
        active: prismaAcademic.active,
        phone: prismaAcademic.phone,
        RA: prismaAcademic.RA,
        password: prismaAcademic.password,
        created_at: prismaAcademic.created_at,
      },
      prismaAcademic.id,
    );
  }

  async findById(id: string): Promise<Academic | null> {
    const academicData = await this.prisma.academic.findUnique({ where: { id } });
    return this.toDomain(academicData);
  }

  async findByEmail(email: string): Promise<Academic | null> {
    const academicData = await this.prisma.academic.findUnique({ where: { email } });
    return this.toDomain(academicData);
  }

  async findByRA(RA: string): Promise<Academic | null> {
    const academicData = await this.prisma.academic.findUnique({ where: { RA } });
    return this.toDomain(academicData);
  }

  async findByPhone(phone: string): Promise<Academic | null> {
    const academicData = await this.prisma.academic.findUnique({ where: { phone } } )
    return this.toDomain(academicData)
  }

  async findAll(): Promise<Academic[]> {
    const academicsData = await this.prisma.academic.findMany();
    return academicsData.map(data => this.toDomain(data)).filter(Boolean) as Academic[];
  }

  async create(data: AcademicProps): Promise<Academic> {
    const createdAcademicData = await this.prisma.academic.create({
      data: {
        name: data.name,
        email: data.email,
        active: data.active ?? true, 
        phone: data.phone,
        RA: data.RA,
        password: data.password, 
      },
    });

    const domainEntity = this.toDomain(createdAcademicData);
    if (!domainEntity) {
        throw new Error('Falha ao mapear entidade criada para o domínio.');
    }
    return domainEntity;
  }

  async update(id: string, data: Partial<AcademicProps>): Promise<Academic | null> {
    try {
      const updatedAcademicData = await this.prisma.academic.update({
        where: { id },
        data: {
          name: data.name,
          email: data.email,
          active: data.active,
          phone: data.phone,
          RA: data.RA,
          password: data.password, // Se a senha puder ser atualizada, deve vir hasheada
        },
      });
      return this.toDomain(updatedAcademicData);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.academic.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error("Erro ao deletar Academic no Prisma:", error);
      return false;
    }
  }
}
