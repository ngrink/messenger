import { IsAlphanumeric, IsEmail, IsString, IsStrongPassword, Matches, Max, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    name: string;

    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsStrongPassword()
    @MaxLength(100)
    password: string;
}
