import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    content: string;
    @IsNotEmpty()
    @IsString()
    type: string;
    @IsNotEmpty()
    @IsBoolean()
    completed: boolean;
    @IsNotEmpty()
    @IsNumber()
    userId: number;


}