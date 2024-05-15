import { NotFoundException } from "@nestjs/common";

export class ChatsException {
	static ChatNotFound() {
		return new NotFoundException('Chat not found', 'CHAT_NOT_FOUND')
	}
}