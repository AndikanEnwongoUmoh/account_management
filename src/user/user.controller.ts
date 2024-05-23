import { Body, Controller, Get, Param, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { userDto } from 'src/dto/user.dto';
import { UserService } from './user.service';
import { LoginDto } from 'src/dto/login.dto';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    async createUser(@Body() createUserDto: userDto) {
       return await this.userService.signup(createUserDto);
    }

    @Post('login')
    async loginUser(@Body() loginUserDto: LoginDto,@Res() res: Response) {
      return  await this.userService.login(loginUserDto, res, );
    }

    @Get(':id')
    async findUser(@Param('id') id: number) {
      return await this.userService.findUser(id);
    }

    @Get()
    async findAllUsers() {
      return await this.userService.findAll();
    }

    @Put(':id/block')
    async blockUser(@Param('id') id: number, @Res() res: Response) {
      return await this.userService.blockUser(id, res);
    }
  
    @Put(':id/unblock')
    async unblockUser(@Param('id') id: number, @Res() res: Response) {
      return  await this.userService.unblockUser(id, res);
    }
  }