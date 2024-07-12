import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

export class ChatsException {
	static ChatNotFound() {
		return new NotFoundException('Chat not found', 'CHAT_NOT_FOUND')
	}

	static FailedToUploadAttachments() {
		return new InternalServerErrorException('Failed to upload attachments', 'FAILED_TO_UPLOAD_ATTACHMENTS')
	}
}