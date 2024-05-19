import { ArrayNotEmpty, IsArray, IsNumber, IsString, MaxLength } from "class-validator";

export class ReadMessagesBodyDto  {
  @IsArray()
  @ArrayNotEmpty()
  messageIds: number[];
}

export class ReadMessagesDto extends ReadMessagesBodyDto {
  @IsNumber()
  chatId: number;

  @IsNumber()
  userId: number;
}