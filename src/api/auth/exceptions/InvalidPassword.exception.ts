import { BaseHttpException } from '../../../exceptions';

export class InvalidCredentialsException extends BaseHttpException {
    constructor() {
        super('Invalid Password!');
    }
}
