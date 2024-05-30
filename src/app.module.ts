import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';


@Module({
  imports: [
    DatabaseModule,
    UserModule, 
    ConfigModule.forRoot( {
      isGlobal: true
    }), 
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply"  <no-reply@' + process.env.MAIL_HOST + '>',
      },
      template:{
        dir: join (__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
      }
    })
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}