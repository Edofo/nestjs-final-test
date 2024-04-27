import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddTaskDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    userId!: string;

    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    priority!: number;
}
