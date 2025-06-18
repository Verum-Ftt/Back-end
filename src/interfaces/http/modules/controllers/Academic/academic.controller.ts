import { ZodValidationPipe } from '../../../pipes/zod/zod-valitation.pipe';
import { FindAcademicUseCase } from '@/core/use-cases/academic/find-academic.use-case';
import { CreateAcademicUseCase } from '@/core/use-cases/academic/create-academic.use-case';
import { DeleteAcademicUseCase } from '@/core/use-cases/academic/delete-academic.use-case';
import { UpdateAcademicUseCase } from '@/core/use-cases/academic/update-academic.use-case';
import { AcademicResponseDto, toAcademicResponseDto } from '../../dtos/response/academic-response.dto';
import { Controller, Post, Body, Inject, HttpCode, UsePipes, Get, Patch, Delete, Param } from '@nestjs/common';
import { CreateAcademicSchema, CreateAcademicRequestDto, UpdateAcademicSchema, UpdateAcademicRequestDto } from '../../dtos/request/academic-request.dto';

@Controller('/academics')
export class AcademicController {
  constructor(
    @Inject(CreateAcademicUseCase)
    private readonly createAcademicUseCase: CreateAcademicUseCase,
    @Inject(FindAcademicUseCase)
    private readonly findAcademicUseCase: FindAcademicUseCase,
    @Inject(DeleteAcademicUseCase)
    private readonly deleteAcademicUseCase: DeleteAcademicUseCase,
    @Inject(UpdateAcademicUseCase)
    private readonly updateAcademicUseCase: UpdateAcademicUseCase,
  ) {}

  // Rotas POST
  @HttpCode(201)
  @Post('/create')
  @UsePipes(new ZodValidationPipe(CreateAcademicSchema)) 
  async create(@Body() createAcademicDto: CreateAcademicRequestDto): Promise<AcademicResponseDto> {
    const academic = await this.createAcademicUseCase.execute(createAcademicDto);
    return toAcademicResponseDto(academic);
  }

  // Rotas GET
  @HttpCode(200)
  @Get('/findById/:id')
  async findById(@Param('id') id: string): Promise<AcademicResponseDto> {
    const academic = await this.findAcademicUseCase.findById(id);
    return toAcademicResponseDto(academic);
  }

  @HttpCode(200)
  @Get('/findByEmail/:email')
  async findByEmail(@Param('email') email: string): Promise<AcademicResponseDto> {
    const academic = await this.findAcademicUseCase.findByEmail(email);
    return toAcademicResponseDto(academic);
  }

  @HttpCode(200)
  @Get('/findByPhone/:phone')
  async findByPhone(@Param('phone') phone: string): Promise<AcademicResponseDto> {
    const academic = await this.findAcademicUseCase.findByPhone(phone);
    return toAcademicResponseDto(academic);
  }

  // Exemplo de PATCH 
  @HttpCode(201)
  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateAcademicSchema)) updateAcademicDto: UpdateAcademicRequestDto): Promise<AcademicResponseDto> 
  {
    const academic = await this.updateAcademicUseCase.execute(id, updateAcademicDto);
    return toAcademicResponseDto(academic);
  }

  // Rotas DELETE
  @HttpCode(204)  
  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteAcademicUseCase.execute(id);
  }

}