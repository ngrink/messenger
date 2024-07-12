import { IsAlphanumeric, MaxLength } from "class-validator";

export class UpdateUsernameDto {
    @IsAlphanumeric()
    @MaxLength(20)
    username: string;
}