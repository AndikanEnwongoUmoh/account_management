import { BadRequestException, HttpException, Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { userDto } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/login.dto';
import { Response } from 'express';

@Injectable()
export class UserService {    constructor(@InjectRepository(User) private userRepository: Repository<User>, private readonly jwtService: JwtService) {}
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
      if (err.code === '22P02') {
        throw new HttpException('Invalid input', 400);
      }
    }
  }

      async login(payload:LoginDto, @Res() res: Response){
        const{email, password} = payload;
        const user = await this.userRepository.findOne({where:{email}})
        if(!user){
            throw new HttpException('Invalid email or password', 400)
        }

        if (user.blocked) {
            throw new BadRequestException('User is blocked');
          }

        const match = await bcrypt.compare(password, user.password)
        if(!match){
            throw new HttpException('Invalid email or password', 400)
        }

        delete user.password

        const token = await this.jwtService.signAsync({id: user.id, email: user.email})
        res.cookie('userAuthenticated', token, {httpOnly: true, maxAge: 3600000})

        return res.send({
          message: 'success',
          token: token,
          user: user

        })
    
    }
    async findUser(id: number){
        const user = await this.userRepository.findOne({where:{id}})
        if(!user){
            throw new HttpException('User not found', 400)
        }
        return user

    }

    async findAll(){
        return await this.userRepository.find()
    }


    async blockUser(id: number, @Res()res: Response) {
        const user = await this.userRepository.findOne({ where:{id}});
        
        if (!user) {
          throw new NotFoundException('User not found');
        }
        
        user.blocked = true;

        await this.userRepository.save(user);
      
        return res.send({ message: 'User Blocked' });
      }
      
      async unblockUser(id: number, @Res()res: Response) {
        const user = await this.userRepository.findOne({ where:{id}});
        
        if (!user) {
          throw new NotFoundException('User not found');
        }
        
        user.blocked = false;

        await this.userRepository.save(user);
      
        return res.send({ message: 'User Unblocked' });
      }

}
