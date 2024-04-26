import { BadRequestException, UnauthorizedException } from "@nestjs/common";

export class AuthException {
	static BadCredentials() {
		return new BadRequestException('Login or password is wrong', 'BAD_CREDENTIALS')
	}

	static Unauthorized() {
		return new UnauthorizedException('Unauthorized request', 'UNAUTHORIZED')
	}
}