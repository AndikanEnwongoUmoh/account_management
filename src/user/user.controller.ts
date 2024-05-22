import { Body, Controller, Post } from '@nestjs/common';
import { userDto } from 'dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    createUser(@Body() createUserDto: userDto) {
      return this.userService.signup(createUserDto);
    }
  }