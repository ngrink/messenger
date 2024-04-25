import { BadRequestException, NotFoundException } from "@nestjs/common";

export class AccountsException {
	static AccountEmailExists() {
		return new BadRequestException(arguments.callee.name, 'Account with that email already exists')
	}

	static AccountNotFound() {
		return new NotFoundException(arguments.callee.name, 'Account not found')
	}
}