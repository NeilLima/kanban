/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';
import { ProjectRepository } from './repository/project.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
      }),
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}
