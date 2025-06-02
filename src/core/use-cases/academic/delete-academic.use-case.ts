import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicRepository, ACADEMIC_REPOSITORY } from '../../repositories/academic.repository';

@Injectable()
export class DeleteAcademicUseCase {
  constructor(
    @Inject(ACADEMIC_REPOSITORY)
    private academicRepository: AcademicRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const academicExists = await this.academicRepository.findById(id)

    if(!academicExists){
        throw new NotFoundException ('Academic id not found')
    }

    const wasDeleted = await this.academicRepository.delete(id)

    if(!wasDeleted){
        throw new NotFoundException ('Failed to delete academic')
    }
  }
}