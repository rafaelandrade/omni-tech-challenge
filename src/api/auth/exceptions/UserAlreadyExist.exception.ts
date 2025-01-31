import { BaseHttpException } from '../../../exceptions';
import { HttpStatus } from '@nestjs/common';

export class UserAlreadyExistException extends BaseHttpException {
    constructor(email: string) {
        super(`User already exist! Email: ${email}`, { email }, HttpStatus.BAD_REQUEST);
    }
}
