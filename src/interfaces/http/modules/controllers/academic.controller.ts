import { ZodValidationPipe } from '../../pipes/zod/zod-valitation.pipe';
import { FindAcademicUseCase } from '@/core/use-cases/academic/find-academic.use-case';
import { CreateAcademicUseCase } from '@/core/use-cases/academic/create-academic.use-case';
import { DeleteAcademicUseCase } from '@/core/use-cases/academic/delete-academic.use-case';
import { UpdateAcademicUseCase } from '@/core/use-cases/academic/update-academic.use-case';
import { AcademicResponseDto, toAcademicResponseDto } from '../dtos/response/academic-response.dto';
import { CreateAcademicSchema, CreateAcademicRequestDto } from '../dtos/request/create-academic.dto';
import { Controller, Post, Body, Inject, HttpCode, UsePipes, Get, Patch, Delete, Param } from '@nestjs/common';

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
  @Get('/findById/:id')
  @HttpCode(200)
  async findById(@Param('id') id: string): Promise<AcademicResponseDto> {
    const academic = await this.findAcademicUseCase.findById(id);
    return toAcademicResponseDto(academic);
  }

  @Get('/findByEmail/:email')
  @HttpCode(200)
  async findByEmail(@Param('email') email: string): Promise<AcademicResponseDto> {
    const academic = await this.findAcademicUseCase.findById(email);
    return toAcademicResponseDto(academic);
  }

  @Get('/findByPhone/:phone')
  @HttpCode(200)
  async findByPhone(@Param('phone') phone: string): Promise<AcademicResponseDto> {
    const academic = await this.findAcademicUseCase.findById(phone);
    return toAcademicResponseDto(academic);
  }

  // Exemplo de PATCH (você precisaria do UpdateAcademicUseCase e DTOs apropriados)
  @Patch('/update/:id')
  @HttpCode(201)
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateAcademicSchema)) updateAcademicDto: UpdateAcademicRequestDto,
  ): Promise<AcademicResponseDto> {
    const academic = await this.updateAcademicUseCase.execute(id, updateAcademicDto);
    return toAcademicResponseDto(academic);
  }

  // Rotas DELETE
  @Delete('/delete/:id')
  @HttpCode(204)  
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteAcademicUseCase.execute(id);
  }

}