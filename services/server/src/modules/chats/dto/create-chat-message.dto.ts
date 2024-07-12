import { IsArray, IsNumber, IsString } from "class-validator";
import { Attachment } from "@prisma/client";

export class CreateChatMessageBodyDto {
  @IsString()
  text: string;

  @IsArray()
  attachments?: Attachment[];
}

export class CreateChatMessageDto extends CreateChatMessageBodyDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  chatId: number;
}
