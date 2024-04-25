import { IsDateString, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class UpdateProfileDto {
    @IsString()
    @MaxLength(20)
    @IsOptional()
    name?: string;

    @IsUrl()
    @IsOptional()
    avatar?: string;

    @IsDateString()
    @IsOptional()
    birthdate?: string;

    @IsString()
    @MaxLength(100)
    @IsOptional()
    description?: string;
}
