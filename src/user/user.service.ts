import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { userDto } from 'dto/user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private readonly jwtService: JwtService) {}
    async signup(payload: userDto){
        payload.email = payload.email.toLowerCase();
        const {email, password, ...rest}=payload
        const user = await this.userRepository.findOne({where:{email}})
        if(user){
            throw new HttpException('Sorry this user with this email already exists', 400)
        }
        try{
          const hashPassword = await bcrypt.hash(password, 10);
          const user = this.userRepository.create({email, password:hashPassword, ...rest})
          return this.userRepository.save(user)
        }catch(err){
          if (err.code === '222P02') {
            throw new HttpException('Invalid input', 400);
          }
        }
      }
    }
