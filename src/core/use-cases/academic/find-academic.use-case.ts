import { Academic } from '@/core/entities/academic.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicRepository, ACADEMIC_REPOSITORY } from '../../repositories/academic.repository';

@Injectable()
export class FindAcademicUseCase {
  constructor(
    @Inject(ACADEMIC_REPOSITORY)
    private academicRepository: AcademicRepository
  ) {}

  async findById(id: string): Promise<Academic> {
    
    const academicExists = await this.academicRepository.findById(id)

    if(!academicExists){
        throw new NotFoundException ('Academic id not found.')
    }

    return academicExists 
  }

  async findByEmail(email: string): Promise<Academic> {
    
    const academicExists = await this.academicRepository.findByEmail(email)

    if(!academicExists){
        throw new NotFoundException ('Academic email not found.')
    }

    return academicExists 
  }

  async findByPhone(phone: string): Promise<Academic> {
    
    const academicExists = await this.academicRepository.findByPhone(phone)

    if(!academicExists){
        throw new NotFoundException ('Academic phone not found.')
    }

    return academicExists 
  }
}