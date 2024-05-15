import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateChatDto {
  @IsNumber()
  targetUserId: number;
}

export class CreateGroupChatDto {
  @IsNumber()
  userId: number;

  @IsString()
  @MaxLength(100)
  name: string;
}


export class CreateChannelChatDto {
  @IsNumber()
  userId: number;

  @IsString()
  @MaxLength(100)
  name: string;
}

