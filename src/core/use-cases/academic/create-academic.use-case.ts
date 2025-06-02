import { hash } from 'bcryptjs';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Academic, AcademicProps } from '../../entities/academic.entity';
import { AcademicRepository, ACADEMIC_REPOSITORY } from '../../repositories/academic.repository';

@Injectable()
export class CreateAcademicUseCase {
  constructor(
    @Inject(ACADEMIC_REPOSITORY)
    private academicRepository: AcademicRepository,
  ) {}

  async execute(data: Omit<AcademicProps, 'id' | 'created_at' | 'active'>): Promise<Academic> {
    
    const emailExists = await this.academicRepository.findByEmail(data.email)
    if (emailExists){
      throw new ConflictException('Academic with the same e-mail address already exists.')
    }
    
    const raExists = await this.academicRepository.findByRA(data.RA)
    if (raExists){
      throw new ConflictException('Academic with the same RA already exists.')
    }
    
    const phoneExists = await this.academicRepository.findByPhone(data.phone)
    if (phoneExists){
      throw new ConflictException('Academic with the same phone number already exists.')
    }

    const hashedPassword = await hash(data.password, 8)

    const academicToCreate: AcademicProps = {
      ...data,
      password: hashedPassword,
    };

    const newAcademic = await this.academicRepository.create(academicToCreate);

    return newAcademic;
  }
}