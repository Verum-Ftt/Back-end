import { Module } from "@nestjs/common";
import { ZodValidationPipe } from "./zod/zod-valitation.pipe";

@Module({
    providers: [ZodValidationPipe],

    exports: [ZodValidationPipe]
})

export class PipesModule {}
