import { BadRequestException, NotFoundException } from "@nestjs/common";

export class UsersException {
	static UserEmailExists() {
		return new BadRequestException('User with that email already exists', 'USER_EMAIL_EXISTS')
	}

	static UsernameExists() {
		return new NotFoundException('User with that username already exists', 'USERNAME_EXISTS')
	}

	static UserNotFound() {
		return new NotFoundException('User not found', 'USER_NOT_FOUND')
	}
}