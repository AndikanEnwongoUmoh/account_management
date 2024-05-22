import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class userDto{
    
@IsString()
@IsNotEmpty()
username: string;

@IsString()
@IsNotEmpty()
@IsEmail()
email: string


@IsString()
@IsNotEmpty()
@MinLength(8, { message: 'Password must be 8-16 characters' })
@MaxLength(16, { message: 'Password must be 8-16 characters' })
@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^da-zA-Z]).{8,}/,({ message: 'Password must contain a-z, A-Z, 0-9 and a special character',}))
password:string
}

