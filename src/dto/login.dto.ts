import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LoginDto {

  @IsString()
  @IsOptional()
  username: string;

  @IsNotEmpty()
  @IsEmail()  
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}