import { ArgumentResponseDto } from './argumentResponse.dto';

export class DetailErrorResponseDto {
    errorCode: string;

    message?: string;

    arguments?: ArgumentResponseDto[];
}
