import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = {
          host: configService.get<string>('DB_HOST'),
          name: configService.get<string>('DB_NAME'),
          user: configService.get<string>('DB_USER'),
          pass: configService.get<string>('DB_PASSWORD'),
          port: configService.get<number>('DB_PORT'),
        };

        return {
          uri: `mongodb://${dbConfig.user}:${dbConfig.pass}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}?authSource=admin`,
        };
      },
      inject: [ConfigService],
    }),
    PostsModule,
    ProfilesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
