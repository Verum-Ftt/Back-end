import { JwtAuthGuard } from "../../Auth/guards/jwt-auth.guard";
import { UserPayload } from "../../Auth/guards/jwt-strategy.guard";
import { ZodValidationPipe } from "@/interfaces/http/pipes/pipes.module";
import { CurrentUser } from "../../Auth/decorators/current-user.decorator";
import { FindEventUseCase } from "@/core/use-cases/event/find-event.use-case";
import { CreateEventUseCase } from "@/core/use-cases/event/create-event.use-case";
import { DeleteEventUseCase } from "@/core/use-cases/event/delete-event.use-case";
import { UpdateEventUseCase } from "@/core/use-cases/event/update-event.use-case";
import { EventResponseDto, toEventListResponseDto, toEventResponseDto } from "../../dtos/response/event-response.dto";
import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateEventRequestDto, CreateEventSchema, UpdateEventRequestDto, UpdateEventSchema } from "../../dtos/request/event-request.dto";

@Controller('/events')
@UseGuards(JwtAuthGuard)
export class EventController {
    constructor(
        @Inject(CreateEventUseCase)
        private readonly createEventUseCase: CreateEventUseCase,
        @Inject(DeleteEventUseCase)
        private readonly deleteEventUseCase: DeleteEventUseCase,
        @Inject(FindEventUseCase)
        private readonly findEventUseCase: FindEventUseCase,
        @Inject(UpdateEventUseCase)
        private readonly updateEventUseCase: UpdateEventUseCase,
    ) {}

    @HttpCode(201)
    @Post('/create')
    @UsePipes(new ZodValidationPipe(CreateEventSchema))
    async create(
        @CurrentUser() user: UserPayload,
        @Body() createEventDto: CreateEventRequestDto ): Promise<EventResponseDto>
    {
        const createEvent = await this.createEventUseCase.execute(createEventDto, user.sub)
        return toEventResponseDto(createEvent)
    }

    @HttpCode(200)
    @Get('/findById/:id')
    async findById(@Param('id') id: string): Promise<EventResponseDto>{
        const findEvent = await this.findEventUseCase.findById(id)
        return toEventResponseDto(findEvent) 
    }

    @HttpCode(200)
    @Get('/findByTitle/:title')
    async findByTitle(@Param('title') title: string): Promise<EventResponseDto>{
        const findEvent = await this.findEventUseCase.findByTitle(title)
        return toEventResponseDto(findEvent) 
    }

    @HttpCode(200)
    @Get('/findByDate/:date')
    async findByDate(@Param('date') dateString: string): Promise<EventResponseDto[]>{
        const findEvent = await this.findEventUseCase.findByDate(dateString)
        return toEventListResponseDto(findEvent) 
    }

    @HttpCode(200)
    @Get('/findByDescription/:description')
    async findByDescription(@Param('description') description: string): Promise<EventResponseDto[]>{
        const findEvent = await this.findEventUseCase.findByDescription(description)
        return toEventListResponseDto(findEvent) 
    }

    @HttpCode(200)
    @Get('/findAll')
    async findAll(): Promise<EventResponseDto[]>{
        const findEvent = await this.findEventUseCase.findAll()
        return toEventListResponseDto(findEvent)
    }

    @HttpCode(200)
    @Patch('/update/:id')
    async update(
        @Param('id') id: string,
        @Body(new ZodValidationPipe(UpdateEventSchema)) updateAcademicDto: UpdateEventRequestDto): Promise<EventResponseDto>
    {
        const updateEvent = await this.updateEventUseCase.execute(id, updateAcademicDto)
        return toEventResponseDto(updateEvent)
    }

    @HttpCode(204)
    @Delete('/delete/:id')
    async delete(@Param('id') id: string){
        await this.deleteEventUseCase.execute(id)
    }
}