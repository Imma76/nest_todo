import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
        @IsEmail()
    email: string;
    @IsNotEmpty()
        @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}


export class UserDto{
    id: number;
}