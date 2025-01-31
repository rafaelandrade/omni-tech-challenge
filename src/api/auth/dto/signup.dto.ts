import {IsDateString, IsEmail, IsNotEmpty} from "class-validator";


export class SignupDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @IsDateString()
    birthdate: string;
}