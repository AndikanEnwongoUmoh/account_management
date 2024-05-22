import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'Strategy/jwt.strategy';

@Module({

  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
     secret: configService.getOrThrow('JWT_SECRET'),
     signOptions: { 
      algorithm: configService.getOrThrow('JWT_ALGORITHM'),
      expiresIn: configService.getOrThrow<string>('JWT_EXPIRESIN'),
      }

    })
    
    , inject: [ConfigService],
  }),
  PassportModule.register({
    defaultStrategy: 'jwt',
    session: true
  })
],

  providers: [UserService],
  controllers: [UserController],
  exports: [ PassportModule, UserService]
})
export class UserModule {}
