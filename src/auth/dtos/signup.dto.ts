import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MinLength } from "class-validator";

export class SignupDto {
    @IsString()
    username: string;

    @IsString()
    @MinLength(6)
    @Matches(/(?=.*[0-9])(?=.*[a-zA-Z])/, { message: 'Password must contain at least one letter and one number' })
    password: string;
}
