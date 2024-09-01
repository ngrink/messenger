import { IsAlphanumeric, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, Matches, Max, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    name: string;

    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1
    })
    @MaxLength(100)
    password: string;
}

export class CreateOAuthUserDto {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsEmail()
  @MaxLength(100)
  email?: string;

  @IsString()
  @IsOptional()
  provider?: string = null

  @IsString()
  @IsOptional()
  providerSub?: string = null
}
