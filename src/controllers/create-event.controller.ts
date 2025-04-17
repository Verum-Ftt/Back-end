import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('/event')
@UseGuards(AuthGuard('jwt'))
export class CreateEventController{
    constructor() {}

    @Post()
    async handle() {
        return 'Hello World'
    }
}