import { ArgumentResponseDto } from './argumentResponse.dto';
import { DetailErrorResponseDto } from './detailErrorResponse.dto';

export class ErrorResponse {
    statusCode?: string;

    errorCode: string;

    domain?: string;

    message?: string[];

    detail?: string;

    arguments?: ArgumentResponseDto[];

    errors?: DetailErrorResponseDto[];
}
