import {IsEmail, IsNotEmpty, IsNumber} from "class-validator";


export class DepositDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}
