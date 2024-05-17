import { IsNumber, IsString } from "class-validator";

export class CreateChatMessageBodyDto {
  @IsString()
  text: string;
}

export class CreateChatMessageDto extends CreateChatMessageBodyDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  chatId: number;
}
