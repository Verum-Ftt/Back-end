import { Academic, AcademicProps } from '../../entities/academic.entity';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicRepository, ACADEMIC_REPOSITORY } from '../../repositories/academic.repository';

@Injectable()
export class UpdateAcademicUseCase {
  constructor(
    @Inject(ACADEMIC_REPOSITORY)
    private academicRepository: AcademicRepository,
  ) {}

  async execute(id: string, data: Partial<Pick<AcademicProps, 'name' | 'email' | 'phone' | 'RA' | 'active'>>): Promise<Academic> {
    
    const academicToUpdate = await this.academicRepository.findById(id)
    if(!academicToUpdate){
      throw new NotFoundException ('Academic id not found')
    }

    if (typeof data.email === 'string') { 
      const emailExists = await this.academicRepository.findByEmail(data.email);
      if (emailExists && emailExists.id !== id) {
        throw new ConflictException('Academic with the same e-mail address already exists.');
      }
    }

    if (typeof data.RA === 'string') { 
      const raExists = await this.academicRepository.findByRA(data.RA); 
      if (raExists && raExists.id !== id) {
        throw new ConflictException('Academic with the same RA already exists.');
      }
    }

    if (typeof data.phone === 'string') { 
      const phoneExists = await this.academicRepository.findByPhone(data.phone);
      if (phoneExists && phoneExists.id !== id) {
        throw new ConflictException('Academic with the same phone number already exists.  ');
      }
    }

    const updatedAcademic = await this.academicRepository.update(id, data);

    if (!updatedAcademic) {
        throw new NotFoundException(`Failed to update scholar with ID '${id}'. The record may no longer exist or the update resulted in no changes.`);
    }
    
    return updatedAcademic;
  }
}