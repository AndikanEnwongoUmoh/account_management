import { Body, Controller, Post, Res } from '@nestjs/common';
import { userDto } from 'dto/user.dto';
import { UserService } from './user.service';
import { LoginDto } from 'dto/login.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    createUser(@Body() createUserDto: userDto) {
      return this.userService.signup(createUserDto);
    }

    @Post('login')
    loginUser(@Body() loginUserDto: LoginDto, @Res() res: Response) {
      return this.userService.login(loginUserDto, res);
    }
  }