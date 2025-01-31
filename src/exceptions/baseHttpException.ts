import { HttpException, HttpStatus } from '@nestjs/common';
import {Args, ErrorResponse} from "../dto";

export abstract class BaseHttpException extends HttpException {
    protected constructor(error: ErrorResponse | string, args?: Args, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
        if (error instanceof ErrorResponse) {
            super(error, statusCode);
        } else {
            super(error, statusCode);
            this._args = args;
        }
    }

    private _args: Args;

    get args(): Args {
        return this._args;
    }

    set args(value: Args) {
        this._args = value;
    }
}
