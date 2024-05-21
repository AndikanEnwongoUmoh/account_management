
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
      useFactory: async (
        ConfigService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        host: ConfigService.getOrThrow('DB_HOST'),
        port: ConfigService.getOrThrow('DB_PORT'),
        username: ConfigService.getOrThrow('DB_USER'),
        password: ConfigService.getOrThrow('DB_PASS'),
        database: ConfigService.getOrThrow('DB_NAME'),
        entities: [User],
        synchronize: true,
      }),
                inject: [ConfigService]
            }),
        ]
        }) 
        export class DatabaseModule {}