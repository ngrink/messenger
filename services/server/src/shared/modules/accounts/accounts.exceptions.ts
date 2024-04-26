import { BadRequestException, NotFoundException } from "@nestjs/common";

export class AccountsException {
	static AccountEmailExists() {
		return new BadRequestException('Account with that email already exists', 'ACCOUNT_EMAIL_EXISTS')
	}

	static AccountNotFound() {
		return new NotFoundException('Account not found', 'ACCOUNT_NOT_FOUND')
	}
}