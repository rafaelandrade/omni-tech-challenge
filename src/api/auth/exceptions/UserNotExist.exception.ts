import { BaseHttpException } from '../../../exceptions';
import { HttpStatus } from '@nestjs/common';

export class UserNotExistException extends BaseHttpException {
    constructor(email: string) {
        super(`User not exist! Email: ${email}`, { email }, HttpStatus.BAD_REQUEST);
    }
}
