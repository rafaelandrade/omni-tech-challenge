import {IsEmail, IsNotEmpty, IsNumber} from "class-validator";


export class WithdrawalDto {
    @IsEmail()
    @IsNotEmpty()
    fromEmail: string;

    @IsEmail()
    @IsNotEmpty()
    toEmail: string

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}
